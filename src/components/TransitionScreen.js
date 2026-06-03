import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import BrandLogo from "./BrandLogo";
import { colors, spacing } from "../styles/theme";

export default function TransitionScreen({ message = "Preparando experiência" }) {
  return (
    <View style={styles.screen}>
      <BrandLogo />
      <View style={styles.status}>
        <ActivityIndicator color={colors.primarySoft} size="large" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center"
  },
  screen: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl
  },
  status: {
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xl
  }
});
