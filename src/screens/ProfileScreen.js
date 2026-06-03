import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import BrandLogo from "../components/BrandLogo";
import { privateRoutes } from "../navigation/routes";
import { exportUserGeneralReport } from "../services/exportService";
import { colors, spacing } from "../styles/theme";

export default function ProfileScreen({
  navigate,
  profileSummary,
  user
}) {
  const [exportFeedback, setExportFeedback] = useState("");
  const [exporting, setExporting] = useState(false);

  async function exportUserData() {
    setExportFeedback("");
    setExporting(true);

    try {
      const message = await exportUserGeneralReport({
        history: profileSummary.matches || [],
        user
      });
      setExportFeedback(message || "Relatório gerado.");
    } catch {
      setExportFeedback("Não foi possível gerar o relatório.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <BrandLogo />
        <Text style={styles.name}>{user.name || "Participante"}</Text>
        <View style={styles.actions}>
          <AppButton
            onPress={() => navigate(privateRoutes.DIFFICULTY)}
            title="Iniciar Sudoku"
          />
          <AppButton
            loading={exporting}
            onPress={exportUserData}
            title="Exportar dados"
            variant="ghost"
          />
          {exportFeedback ? (
            <Text style={styles.feedback}>{exportFeedback}</Text>
          ) : null}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    maxWidth: 360,
    width: "100%"
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    gap: spacing.xl
  },
  feedback: {
    color: colors.primarySoft,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
    textAlign: "center"
  },
  name: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center"
  }
});
