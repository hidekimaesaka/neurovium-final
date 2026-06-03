import AsyncStorage from "@react-native-async-storage/async-storage";

import { analyzeCognitiveData } from "./cognitiveService";
import { generateSudokuPuzzle } from "./sudokuService";

const CURRENT_MATCH_KEY = "@neurovium/currentMatch";
const MATCH_HISTORY_KEY = "@neurovium/matchHistory";
const MIN_UNFINISHED_SAVE_SECONDS = 10 * 60;

export const difficultyOptions = [
  {
    id: "easy",
    label: "Fácil",
    description: "Maior quantidade de números preenchidos.",
    emptyCells: 36
  },
  {
    id: "medium",
    label: "Médio",
    description: "Desafio intermediário com pistas equilibradas.",
    emptyCells: 45
  },
  {
    id: "hard",
    label: "Difícil",
    description: "Menor quantidade de pistas no tabuleiro.",
    emptyCells: 54
  },
  {
    id: "dev-one-missing",
    label: "Dev · 1 casa",
    description: "Modo fake para desenvolvimento com apenas uma casa vazia.",
    emptyCells: 1,
    developmentOnly: true
  }
];

export function getDifficultyById(id) {
  return difficultyOptions.find((difficulty) => difficulty.id === id) || null;
}

export async function createMatch(userId, difficultyId) {
  const difficulty = getDifficultyById(difficultyId);

  if (!difficulty) {
    throw new Error("Dificuldade inválida.");
  }

  const sudoku = generateSudokuPuzzle(difficulty.id);

  const match = {
    id: `match-${Date.now()}`,
    userId,
    difficulty: difficulty.label,
    difficultyId: difficulty.id,
    emptyCells: sudoku.emptyCells,
    expectedEmptyCells: difficulty.emptyCells,
    candidates: {},
    fixedCells: sudoku.fixedCells,
    events: [],
    helpCount: 0,
    lastActionAt: null,
    lastMoveAt: null,
    puzzle: sudoku.puzzle,
    pauseLog: [],
    solution: sudoku.solution,
    startedAt: new Date().toISOString(),
    status: "in_progress",
    userGrid: sudoku.puzzle
  };

  await AsyncStorage.setItem(CURRENT_MATCH_KEY, JSON.stringify(match));
  return match;
}

export async function saveCurrentMatch(match) {
  if (
    match.status === "completed" ||
    (match.status === "abandoned" &&
      match.durationSeconds >= MIN_UNFINISHED_SAVE_SECONDS)
  ) {
    await appendToHistory(match);
    await AsyncStorage.removeItem(CURRENT_MATCH_KEY);
    return match;
  }

  await AsyncStorage.setItem(CURRENT_MATCH_KEY, JSON.stringify(match));
  return match;
}

export async function loadCurrentMatch() {
  const raw = await AsyncStorage.getItem(CURRENT_MATCH_KEY);
  const match = raw ? JSON.parse(raw) : null;
  return match?.status === "in_progress" ? match : null;
}

export async function loadMatchHistory(userId) {
  const raw = await AsyncStorage.getItem(MATCH_HISTORY_KEY);
  const history = raw ? JSON.parse(raw) : [];
  return history.filter((match) => match.userId === userId);
}

export async function clearLocalMatchData(userId) {
  const raw = await AsyncStorage.getItem(MATCH_HISTORY_KEY);
  const history = raw ? JSON.parse(raw) : [];
  const remainingHistory = history.filter((match) => match.userId !== userId);
  await AsyncStorage.setItem(MATCH_HISTORY_KEY, JSON.stringify(remainingHistory));

  const currentMatch = await loadCurrentMatch();
  if (currentMatch?.userId === userId) {
    await AsyncStorage.removeItem(CURRENT_MATCH_KEY);
  }
}

async function appendToHistory(match) {
  const raw = await AsyncStorage.getItem(MATCH_HISTORY_KEY);
  const history = raw ? JSON.parse(raw) : [];
  const withoutCurrent = history.filter((item) => item.id !== match.id);
  await AsyncStorage.setItem(
    MATCH_HISTORY_KEY,
    JSON.stringify([match, ...withoutCurrent])
  );
}

export async function finishMatch(match, status, extra = {}) {
  const finishedAt = new Date().toISOString();
  const durationSeconds = Math.max(
    0,
    Math.round((new Date(finishedAt) - new Date(match.startedAt)) / 1000) -
      (match.pausedSeconds || 0)
  );
  const nextMatch = {
    ...match,
    ...extra,
    cognitiveAnalysis: analyzeCognitiveData({
      ...match,
      ...extra,
      durationSeconds,
      finishedAt,
      status
    }),
    durationSeconds,
    finishedAt,
    status
  };

  const shouldSave =
    status === "completed" || durationSeconds >= MIN_UNFINISHED_SAVE_SECONDS;

  if (shouldSave) {
    await appendToHistory(nextMatch);
    await AsyncStorage.removeItem(CURRENT_MATCH_KEY);
    return { match: nextMatch, saved: true };
  }

  await AsyncStorage.removeItem(CURRENT_MATCH_KEY);
  return { match: nextMatch, saved: false };
}

export function summarizeHistory(history) {
  if (!history.length) {
    return {
      count: 0,
      lastDifficulty: null,
      lastDate: null,
      averageTime: null,
      matches: []
    };
  }

  const completed = history.filter((match) => Number.isFinite(match.durationSeconds));
  const totalDuration = completed.reduce(
    (sum, match) => sum + match.durationSeconds,
    0
  );
  const lastMatch = history[0];

  return {
    count: history.length,
    lastDifficulty: lastMatch.difficulty,
    lastDate: lastMatch.finishedAt || lastMatch.startedAt,
    averageTime: completed.length
      ? Math.round(totalDuration / completed.length)
      : null,
    matches: history
  };
}
