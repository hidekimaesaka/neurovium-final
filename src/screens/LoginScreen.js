import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import AppButton from "../components/AppButton";
import BrandLogo from "../components/BrandLogo";
import NeuralBackground from "../components/NeuralBackground";
import { colors, radii, spacing } from "../styles/theme";

export default function LoginScreen({ authError, loading, onLogin }) {
  const [name, setName] = useState("");
  const [fieldError, setFieldError] = useState("");

  function submit() {
    const error = name.trim() ? "" : "Informe seu nome.";
    setFieldError(error);

    if (!error) {
      onLogin(name.trim());
    }
  }

  const error = fieldError || authError;

  return (
    <SafeAreaView style={styles.screen}>
      <NeuralBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.wrapper}
      >
        <View style={styles.hero}>
          <BrandLogo />
          <Text style={styles.title}>Sudoku cognitivo</Text>
          <Text style={styles.subtitle}>
            Informe seu nome uma única vez para iniciar.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            editable={!loading}
            onChangeText={(value) => {
              setName(value);
              if (fieldError) {
                setFieldError("");
              }
            }}
            onSubmitEditing={submit}
            placeholder="Seu nome"
            placeholderTextColor={colors.textMuted}
            returnKeyType="done"
            style={[styles.input, error && styles.inputError]}
            value={name}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppButton loading={loading} onPress={submit} title="Continuar" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "700",
    marginTop: -spacing.xs
  },
  form: {
    backgroundColor: "rgba(21, 17, 31, 0.86)",
    borderColor: "rgba(196, 181, 253, 0.18)",
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  hero: {
    gap: spacing.md,
    marginBottom: spacing.xl
  },
  input: {
    backgroundColor: "rgba(8, 7, 13, 0.72)",
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 18,
    minHeight: 52,
    paddingHorizontal: spacing.md
  },
  inputError: {
    borderColor: colors.danger
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800"
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    maxWidth: 310
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 42
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg
  }
});
