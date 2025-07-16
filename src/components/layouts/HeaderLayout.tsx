import { CodeLingo, LogoIcon } from "@/assets";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

export const HeaderLayout = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Logo>
          <img src={LogoIcon} alt="logo" />
          <img src={CodeLingo} alt="codeLingo" />
        </Logo>
      </HeaderWrapper>
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

const Logo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  padding: 40px 50px;
  display: flex;
  align-items: center;
  z-index: 100;
`;

const MainContent = styled.main`
  flex-grow: 1;
  overflow-y: auto;
`;
