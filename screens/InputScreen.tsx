import BottomSheet from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

import {
  AboutBottomSheet,
  Container,
  NumberInput,
  PressableBtn,
  TopNavBtn,
} from '../components';
import { RootStackParamList } from '../routes/Route';

// Navigation props and types.
type InputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: InputScreenNavigationProp;
};

/*
App home screen used to collect inputs for training session.
Collects 3 inputs:
- Number of total rounds.
- The duration of a training round.
- The duration of each break round.
*/
const InputScreen = ({ navigation }: Props): ReactElement => {
  const theme = useTheme();
  const [rounds, setRounds] = useState(1);
  const [roundDuration, setroundDuration] = useState(30);
  const [breakDuration, setbreakDuration] = useState(15);

  const { width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  // Bottom sheet modal ref.
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Bottom sheet snap points.
  const snapPoints = useMemo(() => [0, '60%'], []);

  // Bottom sheet summoning function.
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.snapTo(1);
  }, []);

  return (
    <>
      <Container
        color={theme.colors.darkGrey}
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <TopNavBtn
          onPress={() => handlePresentModalPress()}
          iconName="cog"
          size={26}
        />
        <Wrapper
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: -28,
            zIndex: -1,
          }}
        >
          <NumberInput
            label="Rounds"
            width={width}
            min={1}
            max={99}
            interval={1}
            onNumChange={rounds => setRounds(rounds)}
            type="number"
          />
          <NumberInput
            label="Round Duration"
            width={width}
            min={30}
            max={2100}
            interval={30}
            onNumChange={roundDuration => setroundDuration(roundDuration)}
            type="time"
          />
          <NumberInput
            label="Break Duration"
            width={width}
            min={15}
            max={1500}
            interval={15}
            onNumChange={breakDuration => setbreakDuration(breakDuration)}
            type="time"
          />
          <PressableBtn
            title="Let's go"
            onPress={() => {
              navigation.navigate('Training', {
                rounds,
                roundDuration,
                breakDuration,
              });
            }}
          />
        </Wrapper>
      </Container>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
        <AboutBottomSheet />
      </BottomSheet>
    </>
  );
};

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default InputScreen;
