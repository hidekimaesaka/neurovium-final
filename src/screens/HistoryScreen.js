import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import { colors, spacing } from "../styles/theme";

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

function formatDuration(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
}

function compareMatches(matches, difficulty) {
  const filtered = difficulty
    ? matches.filter((match) => match.difficulty === difficulty)
    : matches;
  const ordered = filtered.slice().reverse();

  if (ordered.length < 2) {
    return "São necessárias pelo menos duas partidas para comparar evolução.";
  }

  const first = ordered[0].cognitiveAnalysis?.summary;
  const last = ordered[ordered.length - 1].cognitiveAnalysis?.summary;

  if (!first || !last) {
    return "Algumas partidas ainda não possuem análise suficiente para comparação.";
  }

  const accuracyDelta = last.accuracy - first.accuracy;
  const timeDelta = last.durationSeconds - first.durationSeconds;
  const direction = accuracyDelta >= 0 ? "aumento" : "redução";
  const timeText = timeDelta <= 0 ? "menor tempo total" : "maior tempo total";

  return `Comparando ${ordered.length} partidas: houve ${direction} de ${Math.abs(accuracyDelta)} pontos na precisão e ${timeText}.`;
}

export default function HistoryScreen({ goBack, openReport, profileSummary }) {
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const matches = profileSummary.matches || [];
  const difficulties = [...new Set(matches.map((match) => match.difficulty))];
  const visibleMatches = difficultyFilter
    ? matches.filter((match) => match.difficulty === difficultyFilter)
    : matches;

  return (
    <AppScreen>
      <Header eyebrow="Dados" title="Histórico" />

      <View style={styles.stack}>
        <InfoCard title="Comparação">
          <View style={styles.filterRow}>
            <AppButton
              onPress={() => setDifficultyFilter("")}
              title="Todas"
              variant={difficultyFilter ? "ghost" : "primary"}
            />
            {difficulties.map((difficulty) => (
              <AppButton
                key={difficulty}
                onPress={() => setDifficultyFilter(difficulty)}
                title={difficulty}
                variant={difficultyFilter === difficulty ? "primary" : "ghost"}
              />
            ))}
          </View>
          <Text style={styles.compareText}>
            {compareMatches(matches, difficultyFilter)}
          </Text>
        </InfoCard>

        {visibleMatches.length ? (
          visibleMatches.map((match) => (
            <InfoCard
              key={match.id}
              title={`${match.difficulty} · ${match.status === "completed" ? "Concluída" : "Abandonada"}`}
              subtitle={formatDate(match.finishedAt || match.startedAt)}
            >
              <View style={styles.metrics}>
                <Text style={styles.metric}>Tempo: {formatDuration(match.durationSeconds)}</Text>
                <Text style={styles.metric}>
                  Precisão: {match.cognitiveAnalysis?.summary.accuracy ?? 0}%
                </Text>
                <Text style={styles.metric}>
                  Erros: {match.cognitiveAnalysis?.summary.incorrectMoves ?? 0}
                </Text>
              </View>
              <View style={styles.rowAction}>
                <AppButton onPress={() => openReport(match)} title="Abrir relatório" />
              </View>
            </InfoCard>
          ))
        ) : (
          <InfoCard
            title="Nenhuma partida salva"
            subtitle="Conclua uma partida ou encerre uma partida longa para consultar o histórico."
          />
        )}
      </View>

      <View style={styles.footer}>
        <AppButton onPress={goBack} title="Voltar" variant="ghost" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  compareText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: spacing.md
  },
  filterRow: {
    gap: spacing.sm
  },
  footer: {
    marginTop: spacing.lg
  },
  metric: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "800"
  },
  metrics: {
    gap: 4
  },
  rowAction: {
    marginTop: spacing.md
  },
  stack: {
    gap: spacing.md
  }
});
