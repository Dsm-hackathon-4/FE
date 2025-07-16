import { theme } from "@/themes";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { SelectBtn, StudyCheck } from "@/components";
import { Cat, Check, IconSmaller, RewardChest, OpenChest } from "@/assets";
import { Baloon } from "@/components/Baloon";
import { useState } from "react";

export const HomePage = () => {
  const [openedChests, setOpenedChests] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const dots = [
    true,
    true,
    true,
    "reward",
    false,
    false,
    false,
    "reward",
    false,
    false,
    false,
    "reward",
    false,
    false,
    false,
    "reward",
    false,
    false,
    false,
    "reward",
  ];
  const Road = [
    { road: "데이터베이스 개요", done: true },
    { road: "DBMS (Database Management System)", done: true },
    { road: "ERD (Entity-Relationship Diagram)", done: false },
    { road: "관계형 데이터베이스와 무결성 제약조건", done: false },
    { road: "SQL (Structured Query Language)", done: false },
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
            {dots.map((done, idx) => {
              const isShowBaloon =
                dots[idx] === false &&
                (dots[idx - 1] === true || dots[idx - 1] === "reward") &&
                dots[idx - 2] !== false;
              return done === "reward" ? (
                <StyledRewardChest
                  src={openedChests.has(idx) ? OpenChest : RewardChest}
                  alt=""
                  offset={offsets[idx]}
                  onClick={() => {
                    setOpenedChests((prev) => new Set(prev.add(idx)));
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
                  }}
                />
              ) : (
                <DotWrapper>
                  <StudyCheck
                    done={done as boolean}
                    key={idx}
                    offset={offsets[idx]}
                  />
                  {isShowBaloon && (
                    <Baloon
                      children="SQL 마스터하기"
                      children2="SQL을 열심히 공부해서 실력을 향상시키세요."
                      offset={offsets[idx]}
                    />
                  )}
                </DotWrapper>
              );
            })}
          </Dots>
        </Study>
        <StyledIconSmaller
          src={IconSmaller}
          alt=""
          style={{
            left: "50%",
            top: "50%",
          }}
        />
        <StyledCat
          src={Cat}
          alt=""
          style={{
            left: "20%",
            top: "20%",
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
      {showConfetti && <Confetti />}
    </Wrapper>
  );
};

const DotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

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
  align-items: flex-start;
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
  padding-top: 86px;
`;

const StyledRewardChest = styled.img<{ offset: number }>`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  transform: ${(props) => `translateX(${props.offset * 80}px)`};
  &:hover {
    transform: ${(props) => `translateX(${props.offset * 80}px) scale(1.05)`};
  }
`;

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const StyledIconSmaller = styled.img`
  width: 217px;
  height: 217px;
  position: absolute;
  animation: ${floating} 3s ease-in-out infinite;
`;

const StyledCat = styled.img`
  width: 217px;
  height: 217px;
  position: absolute;
  animation: ${floating} 4s ease-in-out infinite; /* Different duration for variety */
`;

const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const ConfettiPiece = styled.div<{
  color: string;
  size: number;
  delay: number;
  duration: number;
}>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%; /* Make some circles */
  opacity: 0;
  animation: ${confettiFall} ${(props) => props.duration}s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;
  left: ${(props) => Math.random() * 100}vw;
  top: -${(props) => props.size}px;
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
`;

const Confetti = () => {
  const colors = [
    theme.color.green[500],
    theme.color.blue[500],
    theme.color.red[500],
    theme.color.yellow[500],
    theme.color.orange[500],
  ];
  const numPieces = 80; // Increased from 30

  return (
    <ConfettiContainer>
      {Array.from({ length: numPieces }).map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 6; // Increased size range
        const delay = Math.random() * 0.8; // Slightly longer delay range
        const duration = Math.random() * 3 + 3; // Longer duration for more visible fall
        return (
          <ConfettiPiece
            key={i}
            color={color}
            size={size}
            delay={delay}
            duration={duration}
            style={{
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              left: `${Math.random() * 100}vw`,
            }}
          />
        );
      })}
    </ConfettiContainer>
  );
};
