import styled from "@emotion/styled";
import { theme } from "@/themes";
import { Input, Button } from "@/components";
import { Buttons } from "./BlankProblem";

export const DefineProblem = () => {
  return (
    <Wrapper>
      <span style={theme.font.h2}>다음 정의에 해당하는 용어는?</span>
      <div>
        <Contents>
          <Problem>
            <span style={theme.font.t1}>
              인터넷에서 컴퓨터들이 서로 통신하기 위해 사용하는 프로토콜로,
              데이터를 패킷 단위로 나누어 전송하며 신뢰성 있는 연결을 보장하는
              전송 계층 프로토콜입니다. 3-way handshake를 통해 연결을 설정하고
              4-way handshake를 통해 연결을 종료합니다.
            </span>
          </Problem>
          <Input placeholder="답 입력" width="large" />
        </Contents>
        <Buttons>
          <Button size="small" variant="secondary">
            건너뛰기
          </Button>
          <Button size="small">제출하기</Button>
        </Buttons>
      </div>
    </Wrapper>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 108px;
`;

const Problem = styled.div`
  border-radius: 26px;
  border: 1px solid ${theme.color.green[500]};
  width: 930px;
  height: 226px;
  padding: 53px 74px 53px 74px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 65px;
  width: 100%;
  > div {
    gap: 153px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
