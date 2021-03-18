import React, { ReactElement, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { padZero } from '../utils/utils';

type Props = {
  min: number;
  max: number;
  interval: number;
  width: number;
  label: string;
  type: 'time' | 'number';
  onNumChange: (e: number) => void;
};

/*
Swipeable number input component.
*/
const NumberInput = (props: Props): ReactElement => {
  const min = props.min;
  const max = props.max;
  const interval = props.interval;
  const width = props.width;
  const numbers = [];

  // Set dimensions
  let ITEM_SIZE = props.width / 3;
  if (props.type === 'time') {
    ITEM_SIZE = props.width / 2;
  }

  // Set padding
  let H_PADDING = props.width / 3;
  if (props.type === 'time') {
    H_PADDING = ITEM_SIZE / 2;
  }

  // Populate an array with all the possible numbers.
  for (let i = min; i <= max; i += interval) {
    numbers.push(i);
  }

  // Push state change up to parent component.
  const handleChange = (e: number) => {
    props.onNumChange(e);
  };

  // Keep track of horizontal scroll position.
  const scrollX = useRef(new Animated.Value(0)).current;

  // Returns a properly time formated string 00:00
  const display = (num: number): string => {
    if (props.type === 'time') {
      const minutes = Math.floor(num / 60);
      const seconds = num % 60;
      return `${padZero(minutes)}:${padZero(seconds)}`;
    } else {
      return num.toString();
    }
  };

  return (
    <Container>
      <Label>{props.label}</Label>
      <Animated.FlatList
        style={{
          width,
          flexGrow: 0,
        }}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        centerContent
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: H_PADDING }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={numbers}
        keyExtractor={item => item.toString()}
        // Update the index position on swipe end.
        onMomentumScrollEnd={ev => {
          const index =
            (Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE) + 1) *
            interval;
          handleChange(index);
        }}
        renderItem={({ item, index }) => {
          // Set input range for opacity and scale animation.
          const inputRange = [
            ITEM_SIZE * (index - 1.2),
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1.2),
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.05, 1, 0.05],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
          });
          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity,
                transform: [{ scale }],
              }}
            >
              <NumberDisplay
                style={{
                  fontVariant: ['tabular-nums'],
                  fontFamily: 'BarlowCondensed_600SemiBold',
                }}
              >
                {display(item)}
              </NumberDisplay>
            </Animated.View>
          );
        }}
      />
    </Container>
  );
};

const Label = styled.Text`
  align-self: center;
  font-size: ${props => props.theme.fontSize.large};
  color: ${props => props.theme.textColors.primaryText};
`;

const NumberDisplay = styled.Text`
  font-size: 94px;
  color: ${props => props.theme.textColors.primaryText};
`;

const Container = styled.View`
  flex-direction: column;
  align-content: center;
`;
export default NumberInput;
