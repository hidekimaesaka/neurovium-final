import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { colors, spacing } from "../styles/theme";

export default function AppScreen({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingBottom: spacing.xl
  },
  safe: {
    backgroundColor: colors.background,
    flex: 1
  }
});
