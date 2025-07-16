import { Github, Notion, RightArrow } from "@/assets";
import { theme } from "@/themes";
import styled from "@emotion/styled";

export const LinkReviewPage = () => {
  const reviewInfo = [
    {
      name: "새로 생성된 복습",
      value: 4,
    },
    {
      name: "진행 중인 복습",
      value: 7,
    },
  ];
  const linkInfo = [
    {
      name: "Github",
      icon: Github,
      color: theme.color.github,
    },

    {
      name: "Notion",
      icon: Notion,
    },
  ];
  return (
    <Wrapper>
      <Title>
        <span style={theme.font.h3}>복습</span>
        <span style={{ ...theme.font.b1, color: theme.color.zinc[500] }}>
          Lorem Ipsum
        </span>
      </Title>
      <Review>
        <ReviewTitle>
          <span style={theme.font.h3}>오늘의 복습</span>
          <Refresh>
            <span style={theme.font.t2}>새로고침</span>
          </Refresh>
        </ReviewTitle>
        <ReviewContents>
          <ReviewStart>
            <span style={{ ...theme.font.h4, color: theme.color.white }}>
              복습 시작
            </span>
            <img src={RightArrow} alt="" />
          </ReviewStart>
          {reviewInfo.map((info, idx) => (
            <ReviewInfo key={idx}>
              <span style={theme.font.h1} id="value">
                {info.value}
              </span>
              <span style={theme.font.t2}>{info.name}</span>
            </ReviewInfo>
          ))}
        </ReviewContents>
        <ReviewLink>
          <div>
            <span style={theme.font.h3}>연동</span>
            <img src={RightArrow} alt="" />
          </div>
          <LinkContents>
            {linkInfo.map((info, idx) => (
              <LinkContent key={idx} color={info.color} name={info.name}>
                <img src={info.icon} alt="" />
                <div>
                  <span
                    style={{
                      ...theme.font.h3,
                      color:
                        info.name === "Notion"
                          ? theme.color.black
                          : theme.color.white,
                    }}
                  >
                    {info.name}
                  </span>
                  <span
                    style={{ ...theme.font.b2, color: theme.color.zinc[400] }}
                  >
                    Lorem Ipsum
                  </span>
                </div>
              </LinkContent>
            ))}
          </LinkContents>
        </ReviewLink>
      </Review>
    </Wrapper>
  );
};

const LinkContent = styled.div<{ color: string; name: string }>`
  width: 368px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 12px;
  background-color: ${(props) => props.color};
  padding-left: 24px;
  gap: 18px;
  ${(props) =>
    props.name === "Notion" && `border: 4px solid ${theme.color.zinc[800]}`};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const LinkContents = styled.div`
  display: flex;
  gap: 16px;
`;

const ReviewLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ReviewInfo = styled.div`
  width: 200px;
  height: 176px;
  background-color: ${theme.color.zinc[100]};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32px;
  gap: 10px;
`;

const ReviewStart = styled.div`
  width: 193px;
  height: 176px;
  border-radius: 16px;
  background-color: ${theme.color.green[600]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  gap: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const ReviewContents = styled.div`
  width: 1135px;
  height: 222px;
  border-radius: 12px;
  border: 2px solid ${theme.color.zinc[800]};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 10px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding-left: 23px;
  gap: 32px;
`;

const Refresh = styled.div`
  width: 141px;
  height: 46px;
  border-radius: 8px;
  background-color: ${theme.color.green[100]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ReviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding: 50px 0px 0px 32px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
