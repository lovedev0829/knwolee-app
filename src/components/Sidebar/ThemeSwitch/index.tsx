import React from "react";
import styled from "styled-components";
import { useColorMode } from '@chakra-ui/react';
import SunIcon from "../../../Icons/SunIcon";
import MoonIcon from "../../../Icons/MoonIcon";

const Container = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  padding: 4px;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 12px;
  background: #232627;
  flex-direction: ${({ $collapsed }) => ($collapsed ? 'column' : 'unset')};
`;

const ToggleItem = styled.div<{ selected: boolean, $collapsed?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;

  border-radius: 10px;
  background: #141718;
  background: ${props => props.selected ? ' #141718' : 'none'};
  color: ${props => props.selected ? '#e8ecef' : '#6C7275'};
  padding: ${props => props.$collapsed ? ' 8px 12px' : '8px 16px'};
`;

const Text = styled.div`
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
`;

interface Props {
  collapsed?: boolean
}

const ThemeSwitch: React.FC<Props> = ({ collapsed = false }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container $collapsed={collapsed}>
      <ToggleItem
        selected={colorMode === 'light'}
        $collapsed={collapsed}
        onClick={toggleColorMode}
      >
          <IconContainer>
            <SunIcon />
          </IconContainer>
        {!collapsed && <Text>Light</Text>}
        </ToggleItem>
      <ToggleItem
        selected={colorMode === 'dark'}
        $collapsed={collapsed}
        onClick={toggleColorMode}
      >
          <IconContainer>
            <MoonIcon />
          </IconContainer>
        {!collapsed && <Text>Dark</Text>}
        </ToggleItem>
    </Container>
  );
};

export default ThemeSwitch;
