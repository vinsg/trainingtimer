import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
  scrollTo,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import { Container, TimerView, MediaButton } from '../components';
import { RootStackParamList } from '../routes/Route';
import { useTimerStore } from '../store/TimerStore';

// Navigation props and types
type TrainingScreenRouteProp = RouteProp<RootStackParamList, 'Training'>;

type TrainingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Training'
>;

type Props = {
  route: TrainingScreenRouteProp;
  navigation: TrainingScreenNavigationProp;
};

const { width, height } = Dimensions.get('window');

/*
Horizontal scrollview of screen wide TimerView components.
3 media buttons:
- Back to homescreen
- Reset current timer
- Pause/Resume current timer
*/
const TrainingScreen = observer(({ route, navigation }: Props) => {
  // Mobx store.
  const timerStore = useTimerStore();

  // Initial timers creation and cleanup.
  useEffect(() => {
    timerStore.createTimers(
      route.params.rounds,
      route.params.roundDuration,
      route.params.breakDuration
    );
    timerStore.currentTimer.start();
    return () => timerStore.resetTimers();
  }, []);

  // Pause button logic
  const [isRunning, setisRunning] = useState(true);
  const handleChange = () => {
    if (timerStore.currentTimer.isRunning) {
      timerStore.currentTimer.pause();
      setisRunning(false);
    } else {
      timerStore.currentTimer.start();
      setisRunning(true);
    }
  };

  // Forward scroll logic.
  const forwardScroll = () => {
    setisRunning(false);
    if (timerStore.hasNext()) {
      translationX.value = translationX.value + width;
      timerStore.next();
      timerStore.currentTimer.start();
      setisRunning(true);
    } else {
      console.log('timer out of bound');
      navigation.goBack();
    }
  };

  // Forward scroll animation.
  const aref = useAnimatedRef<Animated.ScrollView>();
  const translationX = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(aref, translationX.value, 0, true);
    return translationX.value;
  }, []);

  // Track horizontal scroll offset.
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translationX.value = event.contentOffset.x;
    },
  });

  return (
    <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Animated.ScrollView
        style={[{ flexDirection: 'row', height }]}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ref={aref}
        scrollEnabled={false}
      >
        {timerStore.timers.map((source, id) => (
          <View key={id}>
            <TimerView
              id={id}
              key={id}
              callBack={() => {
                forwardScroll();
              }}
            />
          </View>
        ))}
      </Animated.ScrollView>
      <MediaRow>
        <MediaButton
          onPress={() => {
            timerStore.currentTimer.pause();
            navigation.goBack();
          }}
          iconName="arrow-undo-outline"
          size={56}
        />
        <MediaButton
          onPress={() => {
            timerStore.currentTimer.reset();
            setisRunning(false);
          }}
          iconName="play-skip-back-outline"
          size={56}
        />
        {isRunning ? (
          <MediaButton
            onPress={() => handleChange()}
            iconName="pause-outline"
            size={56}
          />
        ) : (
          <MediaButton
            onPress={() => handleChange()}
            iconName="play-outline"
            size={56}
          />
        )}
      </MediaRow>
    </Container>
  );
});

const MediaRow = styled.View`
  flex-direction: row;
  align-content: center;
  position: absolute;
  bottom: 120px;
  background-color: ${props => props.theme.colors.lightGrey};
  padding: 24px;
  border-radius: 100px;
`;
export default TrainingScreen;
