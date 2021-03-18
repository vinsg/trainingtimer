import React, { ReactElement } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

const ButtonContainer = styled.Pressable`
  width: 180px;
  height: 80px;
  padding: 12px;
  border-radius: 100px;
  background-color: ${props => props.theme.colors.lightGrey};
  justify-content: center;
`;
const ButtonText = styled.Text`
  font-size: 22px;
  text-align: center;
  color: white;
`;

type Props = {
  onPress: () => void;
  title: string;
};

// Animated component for animating the scale.
const AnimatedPressable = Animated.createAnimatedComponent(ButtonContainer);

/*
Main button component with scale animation.
*/
const PressableBtn = ({ onPress, title }: Props): ReactElement => {
  // ReAnimated shared value and style for scale animation.
  const scale = useSharedValue(1);
  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      onPress={() => {
        onPress();
      }}
      onPressIn={() => {
        scale.value = withSpring(0.9);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[animatedScale]}
    >
      <ButtonText>{title}</ButtonText>
    </AnimatedPressable>
  );
};
export default PressableBtn;
