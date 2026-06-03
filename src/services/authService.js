import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "@neurovium/session";
const LOCAL_USER_REGISTRATION = "LOCAL";
const NETWORK_DELAY_MS = 650;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createLocalSession(name) {
  await wait(NETWORK_DELAY_MS);
  const now = new Date().toISOString();
  const user = {
    id: "local-user",
    name: name.trim(),
    registration: LOCAL_USER_REGISTRATION,
    active: true,
    updatedAt: now,
    status: "active"
  };

  await saveSession(user);
  return user;
}

export async function saveSession(user) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function loadSession() {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    await clearSession();
    return null;
  }
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
