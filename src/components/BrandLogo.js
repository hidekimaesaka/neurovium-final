import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../styles/theme";

export default function BrandLogo({ compact = false }) {
  return (
    <View style={[styles.wrapper, compact && styles.compactWrapper]}>
      <View style={[styles.mark, compact && styles.compactMark]}>
        <View style={styles.orbitHorizontal} />
        <View style={styles.orbitVertical} />
        <View style={styles.core} />
      </View>
      <View>
        <Text style={[styles.name, compact && styles.compactName]}>Neurovium</Text>
        {!compact ? <Text style={styles.tagline}>Precisão cognitiva</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compactMark: {
    height: 34,
    width: 34
  },
  compactName: {
    fontSize: 19
  },
  compactWrapper: {
    gap: spacing.sm
  },
  core: {
    backgroundColor: colors.primarySoft,
    borderRadius: 5,
    height: 10,
    width: 10
  },
  mark: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 52,
    justifyContent: "center",
    overflow: "hidden",
    width: 52
  },
  name: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  orbitHorizontal: {
    backgroundColor: colors.primary,
    borderRadius: 2,
    height: 3,
    position: "absolute",
    width: "72%"
  },
  orbitVertical: {
    backgroundColor: colors.primaryDark,
    borderRadius: 2,
    height: "72%",
    position: "absolute",
    width: 3
  },
  tagline: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2,
    textTransform: "uppercase"
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md
  }
});
