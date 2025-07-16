const GOOGLE_LOGIN_URL = import.meta.env.VITE_BACKEND_GOOGLE_LOGIN_URL;

export const getGoogleLoginUrl = () => {
  return GOOGLE_LOGIN_URL;
};
