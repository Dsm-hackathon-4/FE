import { theme } from "@/themes";
import styled from "@emotion/styled";
import { SelectBtn, StudyCheck } from "@/components";
import { Cat, Check, IconSmaller, RewardChest } from "@/assets";

export const HomePage = () => {
  const dots = [true, true, false, false, false, "reward", false, false, false];
  const Road = [
    { road: "데이터베이스 개요", done: true },
    { road: "DBMS (Database Management System)", done: true },
    { road: "ERD (Entity-Relationship Diagram)", done: true },
    { road: "관계형 데이터베이스와 무결성 제약조건", done: true },
    { road: "SQL (Structured Query Language)", done: true },
    { road: "쿼리 최적화 및 튜닝", done: false },
    { road: "정규화 (Normalization)", done: false },
    { road: "병행 수행 제어 (Concurrency Control)", done: false },
    { road: "회복 (Recovery)", done: false },
    { road: "빅데이터 (Big Data)", done: false },
    { road: "데이터베이스 보안 (Database Security)", done: false },
  ];
  const pattern = [
    "center",
    "left",
    "left",
    "right",
    "center",
    "left",
    "left",
    "right",
    "center",
    "left",
    "left",
    "right",
  ];

  const repeatPattern = (pattern: string[], count: number): string[] => {
    return Array.from({ length: count }).flatMap(() => pattern);
  };

  const repeatDots = repeatPattern(pattern, dots.length);

  const getOffsets = (pattern: string[]) => {
    let pos = 0;
    return pattern.map((p) => {
      if (p === "left") pos -= 1;
      else if (p === "right") pos += 1;
      else pos = 0;
      return pos;
    });
  };

  const offsets = getOffsets(repeatDots);
  return (
    <Wrapper>
      <Contents>
        <Study>
          <Title>
            <span style={{ ...theme.font.b1, color: theme.color.white }}>
              데이터베이스 챕터 3
            </span>
            <span style={{ ...theme.font.t1, color: theme.color.white }}>
              SQL 마스터하기
            </span>
          </Title>
          <Dots>
            {dots.map((done, idx) =>
              done === "reward" ? (
                <img
                  src={RewardChest}
                  alt=""
                  style={{
                    transform: `translateX(${offsets[idx] * 80}px)`,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <StudyCheck
                  done={done as boolean}
                  key={idx}
                  offset={offsets[idx]}
                />
              )
            )}
          </Dots>
        </Study>
        <img
          src={IconSmaller}
          alt=""
          style={{
            width: "217px",
            height: "217px",
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        />
        <img
          src={Cat}
          alt=""
          style={{
            width: "217px",
            height: "217px",
            position: "absolute",
            left: "20%",
            top: "15%",
          }}
        />
      </Contents>
      <RoadMap>
        <span style={{ ...theme.font.h4 }}>데이터베이스 로드맵</span>
        <div
          style={{ width: "400px", height: "1px", backgroundColor: "black" }}
        />
        {Road.map((road, idx) => (
          <SelectBtn
            key={idx}
            width="400px"
            children={road.road}
            children2={road.done ? <img src={Check} alt="" /> : <CheckDiv />}
            active={road.done}
          />
        ))}
      </RoadMap>
    </Wrapper>
  );
};

const CheckDiv = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid ${theme.color.zinc[600]};
`;

const RoadMap = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dots = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const Study = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  width: 588px;
  height: 92px;
  background-color: ${theme.color.green[500]};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding: 23px;
  flex-direction: column;
  gap: 4px;
  border-bottom: 6px solid ${theme.color.green[700]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 132px;
`;
