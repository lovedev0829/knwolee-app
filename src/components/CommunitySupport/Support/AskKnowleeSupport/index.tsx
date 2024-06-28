import { FunctionComponent } from "react";
import styled from "styled-components";

const FrameChild = styled.img`
  position: relative;
  width: 112px;
  height: 112px;
`;
const CantFindAny = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 32px;
  font-weight: 500;
`;
const LetsAskThe = styled.div`
  align-self: stretch;
  position: relative;
  font-size: var(--body-regula-size);
  line-height: 24px;
  color: var(--neutral-60);
`;
const Text1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;
const AddIcon = styled.img`
  position: relative;
  width: 24px;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
  display: none;
`;
const SignUp = styled.div`
  position: relative;
  line-height: 24px;
  font-weight: 500;
`;
const Button = styled.div`
  border-radius: var(--br-3xs);
  background-color: var(--primary-50);
  width: 158px;
  display: flex;
  flex-direction: row;
  padding: var(--padding-xs) 0px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  gap: var(--gap-xs);
  font-size: var(--body-regula-size);
  color: var(--neutral-01-100);
`;
const FrameParentRoot = styled.div`
  position: absolute;
  top: 1240px;
  left: 80px;
  border-radius: var(--br-xl);
  background-color: var(--neutral-02-50);
  width: 936px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: var(--padding-61xl) var(--padding-237xl);
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-13xl);
  text-align: center;
  font-size: var(--h4-medium-size);
  color: var(--neutral-90);
  font-family: var(--body-regula);
`;
const AskKnowleeSupport: FunctionComponent = () => {
  return (
    <FrameParentRoot>
      <FrameChild alt="" src="/images/LogoAskKnowlee.png" />
      <Text1>
        <CantFindAny>Can’t find any answer?</CantFindAny>
        <LetsAskThe>Let’s ask the smartest AI Chat</LetsAskThe>
      </Text1>
      <Button>
        <SignUp>Ask Knowlee</SignUp>
      </Button>
    </FrameParentRoot>
  );
};

export default AskKnowleeSupport;
