const REGISTRATION_PATTERN = /^[A-Za-z0-9_-]+$/;
const MIN_LENGTH = 4;
const MAX_LENGTH = 12;

export function normalizeRegistration(value) {
  return value.trim().toUpperCase();
}

export function validateRegistration(value) {
  const registration = normalizeRegistration(value);

  if (!registration) {
    return "Informe o número de registro.";
  }

  if (!REGISTRATION_PATTERN.test(registration)) {
    return "Use apenas letras, números, hífen ou sublinhado.";
  }

  if (registration.length < MIN_LENGTH || registration.length > MAX_LENGTH) {
    return `O registro deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`;
  }

  return "";
}
