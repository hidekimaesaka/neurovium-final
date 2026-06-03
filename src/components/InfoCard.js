import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../styles/theme";

export default function InfoCard({ children, subtitle, title }) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.md
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: spacing.xs
  }
});
