import { Google, Kakao, Logo } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";

export const LoginPage = () => {
  return (
    <Wrapper>
      <img src={Logo} alt="" />
      <LoginDiv>
        <span>재미있고 효과적인 무료 CS 공부</span>
        <BtnDiv>
          <LoginBtn color={theme.color.kakao}>
            <img src={Kakao} alt="Kakao" />
            카카오 로그인
          </LoginBtn>
          <LoginBtn color={theme.color.zinc[100]}>
            <img src={Google} alt="Google" />
            구글 로그인
          </LoginBtn>
        </BtnDiv>
      </LoginDiv>
    </Wrapper>
  );
};

const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`;

const LoginBtn = styled.div`
  width: 331px;
  height: 48px;
  font: ${theme.font.t1};
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  gap: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    opacity: 0.8;
  }
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  > span {
    font: ${theme.font.h2};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 208px;
`;
