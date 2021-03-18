import styled from 'styled-components/native';

interface Props {
  color?: string;
}

/*
Baseline container View element.
*/
const Container = styled.View`
  flex: 1;
  background-color: ${(props: Props) => props.color || 'white'};
`;

export default Container;
