import { Ionicons } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import styled, { useTheme } from 'styled-components/native';

type Props = {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  size: number;
};

/*
Timer control button
*/
const MediaButton = (props: Props): ReactElement => {
  const theme = useTheme();
  return (
    <Button onPress={props.onPress}>
      <Ionicons
        name={props.iconName}
        size={props.size}
        color={theme.textColors.primaryText}
      />
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  margin-left: ${props => props.theme.spaces[2]};
  margin-right: ${props => props.theme.spaces[2]};
`;
export default MediaButton;
