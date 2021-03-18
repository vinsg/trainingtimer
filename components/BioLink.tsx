import { Ionicons } from '@expo/vector-icons';
import React, { ReactElement, useCallback } from 'react';
import { Linking, Pressable, Text } from 'react-native';
import { useTheme } from 'styled-components/native';

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
        paddingTop: 16,
      }}
    >
      <Text style={{ paddingRight: 6, fontSize: 20 }}>{props.label}</Text>
      <Ionicons
        name="arrow-forward-circle-outline"
        size={24}
        color={theme.textColors.secondaryText}
      />
    </Pressable>
  );
};
export default BioLink;
