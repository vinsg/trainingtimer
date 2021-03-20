import { Ionicons } from '@expo/vector-icons';
import React, { ReactElement, useCallback } from 'react';
import { Linking, Pressable } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

type Props = {
  label: string;
  url: string;
};

/*
Pressable component linking to various urls.
*/
const BioLink = (props: Props): ReactElement => {
  const theme = useTheme();

  const handlePress = useCallback(async () => {
    await Linking.openURL(props.url);
  }, [props.url]);

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
      }}
    >
      <Label>{props.label}</Label>
      <Ionicons
        name="arrow-forward-circle-outline"
        size={22}
        color={theme.textColors.secondaryText}
      />
    </Pressable>
  );
};
const Label = styled.Text`
  padding-right: 6px;
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 500;
`;
export default BioLink;
