import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import styled from "@emotion/styled";

export const SideBarLayout = () => {
  return (
    <Container>
      <SideBar />
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin-left: 325px; /* SideBar 너비에 맞춰 조절 */
  flex-grow: 1;
  padding: 20px; /* 콘텐츠와 사이드바 사이의 여백 */
`;
