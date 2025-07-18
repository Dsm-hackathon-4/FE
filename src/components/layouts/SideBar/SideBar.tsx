import styled from "@emotion/styled";
import { theme } from "@/themes";
import { CodeLingo, Learning, Logo, Profile, Ranking, Review } from "@/assets";
import { Link, useLocation } from "react-router";
import { MenuBtn } from "@/components/MenuBtn";

export const SideBar = () => {
  const menuList = [
    {
      name: "학습",
      path: "/",
      icon: Learning,
    },
    {
      name: "복습",
      path: "/review",
      icon: Review,
    },
    {
      name: "리더보드",
      path: "/rank",
      icon: Ranking,
    },
    {
      name: "프로필",
      path: "/profile",
      icon: Profile,
    },
  ];
  const params = useLocation();
  return (
    <Wrapper>
      <Title>
        <LogoImg src={Logo} alt="" />
        <img src={CodeLingo} alt="" />
      </Title>
      <MenuDiv>
        {menuList.map((data, index) => (
          <Link to={data.path} key={index}>
            <MenuBtn
              icon={data.icon}
              isActive={
                data.path === "/"
                  ? params.pathname === data.path
                  : params.pathname.startsWith(data.path)
              }
            >
              {data.name}
            </MenuBtn>
          </Link>
        ))}
      </MenuDiv>
    </Wrapper>
  );
};

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font: ${theme.font.h2};
`;

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  width: 325px; /* 사이드바 너비 */
  height: 100vh; /* 전체 높이 */
  border: 1px solid ${theme.color.zinc[200]};
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 142px;
`;
