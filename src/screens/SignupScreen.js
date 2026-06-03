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
import { validateRegistration } from "../utils/registrationValidation";

export default function SignupScreen({
  authError,
  loading,
  onBackToLogin,
  onSignup
}) {
  const [registration, setRegistration] = useState("");
  const [name, setName] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function validateFields() {
    const errors = {};
    const registrationError = validateRegistration(registration);

    if (registrationError) {
      errors.registration = registrationError;
    }

    if (!name.trim()) {
      errors.name = "Informe o nome.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function submit() {
    if (validateFields()) {
      onSignup({
        registration,
        name: name.trim()
      });
    }
  }

  const registrationError = fieldErrors.registration || authError;

  return (
    <SafeAreaView style={styles.screen}>
      <NeuralBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.wrapper}
      >
        <View style={styles.hero}>
          <BrandLogo />
          <Text style={styles.title}>Criar cadastro</Text>
          <Text style={styles.subtitle}>
            Informe os dados do participante para liberar o acesso.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Número de registro</Text>
            <TextInput
              autoCapitalize="characters"
              autoCorrect={false}
              editable={!loading}
              keyboardType="default"
              onChangeText={(value) => {
                setRegistration(value);
                if (fieldErrors.registration) {
                  setFieldErrors((current) => ({ ...current, registration: "" }));
                }
              }}
              placeholder="Ex.: 20240003"
              placeholderTextColor={colors.textMuted}
              returnKeyType="next"
              style={[styles.input, registrationError && styles.inputError]}
              value={registration}
            />
            {registrationError ? (
              <Text style={styles.error}>{registrationError}</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              editable={!loading}
              onChangeText={(value) => {
                setName(value);
                if (fieldErrors.name) {
                  setFieldErrors((current) => ({ ...current, name: "" }));
                }
              }}
              onSubmitEditing={submit}
              placeholder="Nome completo"
              placeholderTextColor={colors.textMuted}
              returnKeyType="done"
              style={[styles.input, fieldErrors.name && styles.inputError]}
              value={name}
            />
            {fieldErrors.name ? (
              <Text style={styles.error}>{fieldErrors.name}</Text>
            ) : null}
          </View>

          <AppButton loading={loading} onPress={submit} title="Cadastrar" />
          <AppButton
            disabled={loading}
            onPress={onBackToLogin}
            title="Voltar para login"
            variant="ghost"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "700"
  },
  field: {
    gap: spacing.xs
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
