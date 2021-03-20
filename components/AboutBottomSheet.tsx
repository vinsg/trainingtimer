import React, { ReactElement } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';

import BioLink from './BioLink';

/* 
Present a short bio with social links.
*/
const AboutBottomSheet = (): ReactElement => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        source={require('../assets/Profile-round-sm.png')}
        style={{ width: 120, height: 120, marginTop: 20 }}
      />
      <View style={{ alignItems: 'center' }}>
        <AboutText>Hello 👋</AboutText>
        <AboutText>
          My name is Vincent, I am an aspiring developer based in Montreal 🇨🇦
        </AboutText>
        <BioLink label="Website" url="https://vinsg.ca" />
        <BioLink label="Twitter" url="https://twitter.com/_vinsg" />
        <BioLink label="Email" url="mailto:hello@vinsg.ca" />
      </View>
    </View>
  );
};

const AboutText = styled.Text`
  font-size: ${props => props.theme.fontSize.small};
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  line-height: 26px;
`;

export default AboutBottomSheet;
