import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 백엔드 API 기본 URL
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // 쿠키에서 accessToken 가져오기

    if (!accessToken) {
      // accessToken이 없으면 로그인 페이지로 리다이렉트
      toast.error("로그인이 필요합니다.");
      window.location.href = "/login";
      return Promise.reject(
        new Error("No access token found. Redirecting to login.")
      );
    }

    // accessToken이 있으면 Authorization 헤더에 추가
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = "알 수 없는 오류가 발생했습니다.";

      if (data && data.message) {
        errorMessage = data.message;
      } else if (status === 401) {
        errorMessage = "인증 정보가 유효하지 않습니다. 다시 로그인해주세요.";
        Cookies.remove("accessToken");
        window.location.href = "/login";
      } else if (status === 403) {
        errorMessage = "접근 권한이 없습니다.";
      } else if (status >= 500) {
        errorMessage = "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }
      toast.error(errorMessage);
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못함 (네트워크 오류 등)
      toast.error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
    } else {
      // 요청 설정 중 에러 발생
      toast.error("요청을 처리하는 중 오류가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default instance;
