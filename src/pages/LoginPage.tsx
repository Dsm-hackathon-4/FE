import { Google, Kakao } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";

export const LoginPage = () => {
  return (
    <Wrapper>
      <Logo>로고</Logo>
      <LoginDiv>
        <span>재미있고 효과적인 무료 CS 공부</span>
        <BtnDiv>
          <LoginBtn color={theme.color.kakao}>
            <img src={Kakao} alt="" />
            카카오 로그인
          </LoginBtn>
          <LoginBtn color={theme.color.zinc[100]}>
            <img src={Google} alt="" />
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 208px;
`;

const Logo = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${theme.color.green[500]};
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
