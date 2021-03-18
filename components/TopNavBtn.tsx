import { Ionicons } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components/native';

type Props = {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  size: number;
};

/*
Gear icon presenting the about bottom sheet.
*/
const TopNavBtn = (props: Props): ReactElement => {
  return (
    <Button onPress={props.onPress} hitSlop={20}>
      <Ionicons
        name={props.iconName}
        size={props.size}
        color="rgba(255, 255, 255, 0.9)"
      />
    </Button>
  );
};

const Button = styled.Pressable`
  width: 26px;
  height: 26px;
  align-self: flex-end;
  margin-top: ${props => props.theme.spaces[1]};
  margin-right: ${props => props.theme.spaces[4]};
`;
export default TopNavBtn;
