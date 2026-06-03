import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";

import AppButton from "../components/AppButton";
import { colors, radii, spacing } from "../styles/theme";

function formatDuration(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
}

export default function ResultScreen({
  goToProfile,
  match,
  onPlayAgain
}) {
  const scale = useRef(new Animated.Value(0.86)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const analysis = match?.cognitiveAnalysis;
  const summary = analysis?.summary;
  const completed = match?.status === "completed";

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        friction: 6,
        tension: 70,
        toValue: 1,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        duration: 420,
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();
  }, [opacity, scale]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.badge,
            { opacity, transform: [{ scale }] }
          ]}
        >
          <Text style={styles.badgeText}>{completed ? "OK" : "Fim"}</Text>
        </Animated.View>

        <Text style={styles.title}>
          {completed ? "Jogo concluído" : "Jogo encerrado"}
        </Text>

        <View style={styles.summary}>
          <SummaryItem label="Tempo" value={formatDuration(summary?.durationSeconds)} />
          <SummaryItem label="Acertos" value={String(summary?.correctMoves || 0)} />
          <SummaryItem label="Erros" value={String(summary?.incorrectMoves || 0)} />
          <SummaryItem label="Progresso" value={`${summary?.progress || 0}%`} />
        </View>

        <View style={styles.actions}>
          <AppButton
            onPress={() => onPlayAgain(match?.difficultyId)}
            title="Jogar novamente"
          />
          <AppButton onPress={goToProfile} title="Sair" variant="ghost" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function SummaryItem({ label, value }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    maxWidth: 360,
    width: "100%"
  },
  badge: {
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
    borderRadius: 56,
    borderWidth: 3,
    height: 112,
    justifyContent: "center",
    width: 112
  },
  badgeText: {
    color: "#166534",
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 50
  },
  content: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xl,
    justifyContent: "center",
    padding: spacing.lg
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1
  },
  summary: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
    maxWidth: 380,
    width: "100%"
  },
  summaryItem: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderRadius: radii.md,
    borderWidth: 1,
    flexBasis: "48%",
    padding: spacing.md
  },
  summaryLabel: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 4
  },
  summaryValue: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "900"
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center"
  }
});
