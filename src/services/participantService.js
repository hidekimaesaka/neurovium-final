import { normalizeRegistration } from "../utils/registrationValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PARTICIPANTS_KEY = "@neurovium/participants";

const seedParticipants = {
  "20240001": {
    id: "participant-20240001",
    name: "Ana Beatriz Costa",
    registration: "20240001",
    active: true,
    updatedAt: "2026-06-02T00:00:00.000Z"
  },
  "20240002": {
    id: "participant-20240002",
    name: "Rafael Martins Lima",
    registration: "20240002",
    active: true,
    updatedAt: "2026-06-02T00:00:00.000Z"
  },
  INATIVO1: {
    id: "participant-inativo1",
    name: "Marina Alves Rocha",
    registration: "INATIVO1",
    active: false,
    updatedAt: "2026-06-02T00:00:00.000Z"
  }
};

function withStatus(participant) {
  if (!participant) {
    return null;
  }

  const active = participant.active ?? participant.status === "active";

  return {
    ...participant,
    active,
    fullName: participant.fullName || participant.name,
    name: participant.name || participant.fullName,
    status: active ? "active" : "inactive"
  };
}

async function loadStoredParticipants() {
  const raw = await AsyncStorage.getItem(PARTICIPANTS_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    await AsyncStorage.removeItem(PARTICIPANTS_KEY);
    return {};
  }
}

async function loadParticipants() {
  const storedParticipants = await loadStoredParticipants();
  return {
    ...seedParticipants,
    ...storedParticipants
  };
}

export async function findParticipantByRegistration(registration) {
  const normalized = normalizeRegistration(registration);
  const participants = await loadParticipants();
  return withStatus(participants[normalized]);
}

export async function createParticipant({ registration, name }) {
  const normalized = normalizeRegistration(registration);
  const participants = await loadParticipants();

  if (participants[normalized]) {
    return {
      status: "registration_exists",
      participant: withStatus(participants[normalized])
    };
  }

  const now = new Date().toISOString();
  const participant = {
    id: `participant-${normalized.toLowerCase()}`,
    registration: normalized,
    name: name.trim(),
    active: true,
    updatedAt: now
  };

  const storedParticipants = await loadStoredParticipants();
  await AsyncStorage.setItem(
    PARTICIPANTS_KEY,
    JSON.stringify({
      ...storedParticipants,
      [normalized]: participant
    })
  );

  return {
    status: "created",
    participant: withStatus(participant)
  };
}
