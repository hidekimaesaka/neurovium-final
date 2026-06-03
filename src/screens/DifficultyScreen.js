import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import Header from "../components/Header";
import { difficultyOptions } from "../services/gameService";
import { colors, radii, spacing } from "../styles/theme";

export default function DifficultyScreen({ goBack, startMatch }) {
  return (
    <AppScreen>
      <Header eyebrow="Partida" title="Dificuldade" />

      <View style={styles.stack}>
        {difficultyOptions.map((difficulty) => (
          <TouchableOpacity
            accessibilityRole="button"
            key={difficulty.id}
            onPress={() => startMatch(difficulty.id)}
            style={styles.option}
          >
            <View>
              <Text style={styles.name}>{difficulty.label}</Text>
              <Text style={styles.description}>{difficulty.description}</Text>
              <Text style={styles.clues}>
                {81 - difficulty.emptyCells} pistas iniciais
              </Text>
              {difficulty.developmentOnly ? (
                <Text style={styles.devBadge}>Somente desenvolvimento</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}

        <AppButton onPress={goBack} title="Voltar" variant="ghost" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  clues: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4
  },
  devBadge: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: "900",
    marginTop: spacing.xs,
    textTransform: "uppercase"
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  option: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.md
  },
  stack: {
    gap: spacing.md
  }
});
