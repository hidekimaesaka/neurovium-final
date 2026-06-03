import AsyncStorage from "@react-native-async-storage/async-storage";

const CONSENT_KEY = "@neurovium/consent";
const CONSENT_ACCEPTED_KEY = `${CONSENT_KEY}:accepted`;

async function loadStoredConsent(key) {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    await AsyncStorage.removeItem(key);
    return null;
  }
}

export async function saveConsent(userId) {
  const consent = {
    acceptedAt: new Date().toISOString(),
    dataCollected: [
      "jogadas",
      "tempo de partida",
      "erros",
      "pausas",
      "dicas",
      "anotações",
      "relatório cognitivo observacional"
    ],
    userId
  };

  const serializedConsent = JSON.stringify(consent);
  await AsyncStorage.multiSet([
    [`${CONSENT_KEY}:${userId}`, serializedConsent],
    [CONSENT_ACCEPTED_KEY, serializedConsent]
  ]);

  return consent;
}

export async function loadConsent(userId) {
  return (
    (await loadStoredConsent(`${CONSENT_KEY}:${userId}`)) ||
    (await loadStoredConsent(CONSENT_ACCEPTED_KEY))
  );
}
