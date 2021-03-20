import { useDimensions } from '@react-native-community/hooks';
import { Audio } from 'expo-av';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import { TimerType, useTimerStore } from '../store/TimerStore';

type Props = {
  id: number;
  callBack: () => void;
};

/*
Main training timer view.
CallBack function used to manage animation instead of useAnimatedProps hook because functionnal component cannot be turned into animated. 
*/
const TimerView = observer((props: Props) => {
  const timerStore = useTimerStore();
  const { width, height } = useDimensions().window;

  // Number of rounds left.
  const roundsLeft = (): string => {
    if (timerStore.roundsLeft === 0) {
      return 'Last round!';
    } else if (timerStore.roundsLeft === 1) {
      return '1 more round to go!';
    }
    return `${timerStore.roundsLeft} more rounds to go!`;
  };

  // Sound loading and playing logic
  const [sound, setSound] = React.useState<Audio.Sound | undefined>();
  const chime = require('../assets/chime.mp3');

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(chime);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  // Cleanup sound when component unmount
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Id used to get info from store.
  const id = props.id;

  // Timer end sequence.
  useEffect(() => {
    if (timerStore.timers[id].currentCount === 0) {
      opacity.value = withRepeat(withTiming(0, { duration: 300 }), 2, true);
      // Timeout used to go around reanimated withRepeat unexpected behaviour with end sequence function.
      window.setTimeout(() => props.callBack(), 1000);
      playSound();
    }
  }, [timerStore.timers[id].currentCount]);

  // Opacity animation logic.
  const opacity = useSharedValue(1);
  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Container
      width={width}
      height={height}
      type={timerStore.timers[id].timerType}
    >
      <TrainingTitle>{timerStore.timers[id].timerType}</TrainingTitle>
      <Animated.View style={animatedOpacity}>
        <DisplayNum>{timerStore.timers[id].display}</DisplayNum>
      </Animated.View>
      <SectionText>{roundsLeft()}</SectionText>
    </Container>
  );
});

interface ContainerProps {
  width: number;
  height: number;
  type: TimerType | undefined;
}

// Background color function based on type of round.
const Container = styled.View`
  background-color: ${props => {
    switch (props.type) {
      case TimerType.ready:
        return props.theme.colors.darkBlue;
      case TimerType.train:
        return props.theme.colors.darkGreen;
      case TimerType.break:
        return props.theme.colors.darkRed;
      default:
        return 'black';
    }
  }};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: ContainerProps) => props.width}px;
  height: ${(props: ContainerProps) => props.height}px;
  padding-bottom: ${(props: ContainerProps) => props.height / 7}px;
`;

const SectionText = styled.Text`
  font-size: ${props => props.theme.fontSize.medium};
  color: ${props => props.theme.textColors.primaryText};
`;

const DisplayNum = styled.Text`
  font-family: 'BarlowCondensed_600SemiBold';
  font-size: 160px;
  font-variant: tabular-nums;
  color: ${props => props.theme.textColors.primaryText};
  text-shadow: rgba(255, 255, 255, 0.2) 6px 6px 0;
`;
const TrainingTitle = styled.Text`
  font-size: 60px;
  color: ${props => props.theme.textColors.primaryText};
`;

export default TimerView;
