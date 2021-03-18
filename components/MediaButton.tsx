import { Ionicons } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components/native';

type Props = {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  size: number;
};

/*
Timer control button
*/
const MediaButton = (props: Props): ReactElement => {
  return (
    <Button onPress={props.onPress}>
      <Ionicons
        name={props.iconName}
        size={props.size}
        color="rgba(255, 255, 255, 0.9)"
      />
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  margin-left: 8px;
  margin-right: 8px;
`;
export default MediaButton;
