import { StyleSheet, Text, View } from "react-native";

import BrandLogo from "./BrandLogo";
import { colors, spacing } from "../styles/theme";

export default function Header({ eyebrow, title }) {
  return (
    <View style={styles.header}>
      <BrandLogo compact />
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: colors.primarySoft,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: spacing.xs,
    textTransform: "uppercase"
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.lg
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900"
  }
});
