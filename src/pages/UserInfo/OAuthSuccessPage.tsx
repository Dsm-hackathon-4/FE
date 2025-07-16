import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "@emotion/styled";

export const OAuthSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    console.log("Extracted accessToken:", accessToken);

    if (accessToken) {
      console.log("Navigating to home page...");
      Cookies.set("accessToken", accessToken, { expires: 7 }); // 7일 후 만료되는 쿠키로 저장
      console.log("✅ Saved to Cookies");
      setTimeout(() => navigate("/selectSubject"), 500);
    } else {
      console.error(
        "OAuth 성공 후 토큰이 없습니다. 로그인 페이지로 리다이렉트합니다."
      );
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 리다이렉트
    }
  }, [location, navigate]);

  return (
    <Wrapper>
      <h1>Loading...</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
