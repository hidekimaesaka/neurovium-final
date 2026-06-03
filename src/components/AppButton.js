import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

import { colors, radii, spacing } from "../styles/theme";

export default function AppButton({
  disabled,
  loading,
  onPress,
  title,
  variant = "primary"
}) {
  const isGhost = variant === "ghost";
  const isDanger = variant === "danger";

  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        isGhost && styles.ghost,
        isDanger && styles.danger,
        (disabled || loading) && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isGhost ? colors.primarySoft : colors.white} />
      ) : (
        <Text style={[styles.text, isGhost && styles.ghostText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.primarySoft,
    borderWidth: 1,
    borderRadius: radii.md,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg
  },
  danger: {
    backgroundColor: colors.danger
  },
  disabled: {
    opacity: 0.62
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: colors.border,
    borderWidth: 1
  },
  ghostText: {
    color: colors.primarySoft
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800"
  }
});
