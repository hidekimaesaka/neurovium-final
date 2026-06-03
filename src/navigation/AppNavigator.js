import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import TransitionScreen from "../components/TransitionScreen";
import {
  createLocalSession,
  loadSession
} from "../services/authService";
import {
  clearLocalMatchData,
  createMatch,
  finishMatch,
  loadCurrentMatch,
  loadMatchHistory,
  saveCurrentMatch,
  summarizeHistory
} from "../services/gameService";
import { loadConsent, saveConsent } from "../services/privacyService";
import LoginScreen from "../screens/LoginScreen";
import ConsentScreen from "../screens/ConsentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DifficultyScreen from "../screens/DifficultyScreen";
import GameScreen from "../screens/GameScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ResultScreen from "../screens/ResultScreen";
import ExportScreen from "../screens/ExportScreen";
import { privateRoutes, publicRoutes } from "./routes";

export default function AppNavigator() {
  const [authError, setAuthError] = useState("");
  const [booting, setBooting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");
  const [match, setMatch] = useState(null);
  const [profileSummary, setProfileSummary] = useState(summarizeHistory([]));
  const [pendingDifficultyId, setPendingDifficultyId] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(null);
  const [routeStack, setRouteStack] = useState([publicRoutes.LOGIN]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const session = await loadSession();
      if (!session) {
        return;
      }

      setUser(session);
      setPrivacyConsent(await loadConsent(session.id));
      await refreshProfileData(session);
      setRouteStack([privateRoutes.PROFILE]);
    } finally {
      setBooting(false);
    }
  }

  async function handleLogin(name) {
    setAuthError("");
    setLoading(true);
    setTransitionMessage("Salvando perfil");

    try {
      const account = await createLocalSession(name);
      setUser(account);
      setPrivacyConsent(await loadConsent(account.id));
      await refreshProfileData(account);
      setRouteStack([privateRoutes.PROFILE]);
    } catch {
      setAuthError("Erro ao salvar o nome. Tente novamente.");
    } finally {
      setLoading(false);
      setTransitionMessage("");
    }
  }

  function navigate(route) {
    if (!user) {
      setRouteStack([publicRoutes.LOGIN]);
      return;
    }

    setRouteStack((current) => [...current, route]);
  }

  async function refreshProfileData(account) {
    const [history, currentMatch] = await Promise.all([
      loadMatchHistory(account.id),
      loadCurrentMatch()
    ]);

    setProfileSummary(summarizeHistory(history));
    setMatch(currentMatch?.userId === account.id ? currentMatch : null);
  }

  async function startMatch(difficultyId) {
    if (!user) {
      setRouteStack([publicRoutes.LOGIN]);
      return;
    }

    if (!privacyConsent) {
      setPendingDifficultyId(difficultyId);
      setRouteStack((current) => [...current, privateRoutes.CONSENT]);
      return;
    }

    await createAndOpenMatch(difficultyId);
  }

  async function createAndOpenMatch(difficultyId) {
    setTransitionMessage("Gerando Sudoku preciso");
    try {
      const [nextMatch] = await Promise.all([
        createMatch(user.id, difficultyId),
        new Promise((resolve) => setTimeout(resolve, 650))
      ]);
      setMatch(nextMatch);
      setRouteStack((current) => [...current, privateRoutes.GAME]);
    } finally {
      setTransitionMessage("");
    }
  }

  async function playAgain(difficultyId) {
    if (!user || !difficultyId) {
      setRouteStack([privateRoutes.PROFILE]);
      return;
    }

    setTransitionMessage("Gerando Sudoku preciso");
    try {
      const [nextMatch] = await Promise.all([
        createMatch(user.id, difficultyId),
        new Promise((resolve) => setTimeout(resolve, 650))
      ]);
      setMatch(nextMatch);
      setRouteStack([privateRoutes.GAME]);
    } finally {
      setTransitionMessage("");
    }
  }

  async function acceptConsentAndStart() {
    if (!user) {
      return;
    }

    const consent = await saveConsent(user.id);
    setPrivacyConsent(consent);
    const difficultyId = pendingDifficultyId;
    setPendingDifficultyId("");
    await createAndOpenMatch(difficultyId);
  }

  function declineConsent() {
    setPendingDifficultyId("");
    setRouteStack([privateRoutes.PROFILE]);
  }

  async function persistMatch(nextMatch) {
    setMatch(nextMatch);
    await saveCurrentMatch(nextMatch);
  }

  function openReport(savedMatch) {
    if (!user || savedMatch.userId !== user.id) {
      return;
    }

    setMatch(savedMatch);
    setRouteStack((current) => [...current, privateRoutes.RESULT]);
  }

  async function endMatch(nextMatch, status, extra) {
    const { match: finishedMatch } = await finishMatch(nextMatch, status, extra);
    setMatch(finishedMatch);
    if (user) {
      await refreshProfileData(user);
      setMatch(finishedMatch);
    }

    setRouteStack((current) => [...current, privateRoutes.RESULT]);
  }

  function goBack() {
    setRouteStack((current) => {
      if (current.length <= 1) {
        return current;
      }

      return current.slice(0, -1);
    });
  }

  async function goToProfile() {
    if (user) {
      await refreshProfileData(user);
    }
    setRouteStack([privateRoutes.PROFILE]);
  }

  async function deleteLocalData() {
    if (!user) {
      return;
    }

    await clearLocalMatchData(user.id);
    setMatch(null);
    await refreshProfileData(user);
  }

  if (booting) {
    return (
      <>
        <StatusBar hidden />
        <TransitionScreen message="Carregando Neurovium" />
      </>
    );
  }

  if (transitionMessage) {
    return (
      <>
        <StatusBar hidden />
        <TransitionScreen message={transitionMessage} />
      </>
    );
  }

  const currentRoute = routeStack[routeStack.length - 1];

  if (!user) {
    return (
      <>
        <StatusBar hidden />
        <LoginScreen
          authError={authError}
          loading={loading}
          onLogin={handleLogin}
        />
      </>
    );
  }

  const commonProps = {
    goBack,
    goToProfile,
    match,
    navigate,
    onMatchEnd: endMatch,
    onMatchUpdate: persistMatch,
    onPlayAgain: playAgain,
    openReport,
    onConsentAccept: acceptConsentAndStart,
    onConsentDecline: declineConsent,
    onDeleteLocalData: deleteLocalData,
    privacyConsent,
    profileSummary,
    startMatch,
    user
  };

  return (
    <>
      <StatusBar hidden />
      {currentRoute === privateRoutes.PROFILE ? <ProfileScreen {...commonProps} /> : null}
      {currentRoute === privateRoutes.DIFFICULTY ? <DifficultyScreen {...commonProps} /> : null}
      {currentRoute === privateRoutes.GAME ? <GameScreen {...commonProps} /> : null}
      {currentRoute === privateRoutes.HISTORY ? <HistoryScreen {...commonProps} /> : null}
      {currentRoute === privateRoutes.CONSENT ? <ConsentScreen {...commonProps} /> : null}
      {currentRoute === privateRoutes.RESULT ? <ResultScreen {...commonProps} /> : null}
      {currentRoute === privateRoutes.EXPORT ? <ExportScreen {...commonProps} /> : null}
    </>
  );
}
