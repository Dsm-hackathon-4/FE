const KAKAO_LOGIN_URL = import.meta.env.VITE_BACKEND_KAKAO_LOGIN_URL;

export const getKakaoLoginUrl = () => {
  return KAKAO_LOGIN_URL;
};