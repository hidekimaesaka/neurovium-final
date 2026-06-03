import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import { exportReportJson, exportReportPdf } from "../services/exportService";
import { colors, spacing } from "../styles/theme";

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

export default function ExportScreen({ goBack, profileSummary, user }) {
  const [feedback, setFeedback] = useState("");

  async function exportMatch(match, format) {
    setFeedback("Gerando relatório...");
    try {
      const params = {
        history: profileSummary.matches || [],
        match,
        user
      };
      const message =
        format === "json"
          ? await exportReportJson(params)
          : await exportReportPdf(params);
      setFeedback(message);
    } catch {
      setFeedback("Não foi possível exportar o relatório.");
    }
  }

  const matches = profileSummary.matches || [];

  return (
    <AppScreen>
      <Header eyebrow="Dados" title="Exportação" />

      {matches.length ? (
        <View style={styles.stack}>
          {matches.map((match) => (
            <InfoCard
              key={match.id}
              title={`${match.difficulty} · ${match.status === "completed" ? "Concluída" : "Abandonada"}`}
              subtitle={formatDate(match.finishedAt || match.startedAt)}
            >
              <View style={styles.actions}>
                <AppButton onPress={() => exportMatch(match, "json")} title="Export JSON" />
                <AppButton onPress={() => exportMatch(match, "pdf")} title="Export PDF" variant="ghost" />
              </View>
            </InfoCard>
          ))}
        </View>
      ) : (
        <InfoCard
          title="Sem partidas exportáveis"
          subtitle="Conclua uma partida ou encerre uma partida com mais de 10 minutos para gerar relatórios."
        />
      )}

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <View style={styles.footer}>
        <AppButton onPress={goBack} title="Voltar" variant="ghost" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
    marginTop: spacing.md
  },
  feedback: {
    color: colors.primarySoft,
    fontSize: 13,
    fontWeight: "800",
    marginTop: spacing.md
  },
  footer: {
    marginTop: spacing.lg
  },
  stack: {
    gap: spacing.md
  }
});
