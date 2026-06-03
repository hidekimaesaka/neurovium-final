import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import { colors, spacing } from "../styles/theme";

export default function ConsentScreen({ onConsentAccept, onConsentDecline }) {
  return (
    <AppScreen>
      <Header eyebrow="Privacidade" title="Consentimento" />

      <View style={styles.stack}>
        <InfoCard title="Análise observacional">
          <Text style={styles.text}>
            O Neurovium não fornece diagnóstico médico. Os resultados descrevem
            comportamentos observados durante o Sudoku. Em caso de suspeita
            clínica, procure avaliação profissional qualificada.
          </Text>
        </InfoCard>

        <InfoCard title="Dados coletados">
          <Text style={styles.text}>
            Durante a partida serão registrados jogadas, tempos, erros,
            correções, pausas, dicas, anotações e métricas cognitivas
            observacionais vinculadas ao seu nome.
          </Text>
        </InfoCard>

        <AppButton onPress={onConsentAccept} title="Aceito e quero jogar" />
        <AppButton onPress={onConsentDecline} title="Cancelar" variant="ghost" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md
  },
  text: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22
  }
});
