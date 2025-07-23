import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';

export const Header = styled.View`
  height: 40%;

  justify-content: center;
`;

export const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Form = styled.View`
  padding: ${scale(20)}px ${scale(40)}px ${scale(20)}px ${scale(40)}px;
  flex: 1;
  background-color: #fff;
  align-items: center;
  margin-top: ${scale(-10)}px;
  border-top-right-radius: ${scale(12)}px;
  border-top-left-radius: ${scale(12)}px;
`;

export const LogoContainer = styled.View``;

export const LogoText = styled.Text`
  font-size: ${scale(20)}px;
  color: #fff;
  font-weight: bold;
`;

export const AppTitle = styled.Text`
  font-size: ${scale(18)}px;
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  color: gray;
  margin-bottom: ${scale(20)}px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  font-weight: bold;
  margin-top: ${scale(20)}px;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: #ccc;
  padding: ${scale(10)}px;
  border-radius: ${scale(5)}px;
  margin-top: ${scale(5)}px;
`;

export const PasswordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
  border-radius: ${scale(8)}px;

  padding-right: ${scale(10)}px;
  margin-top: ${scale(10)}px;
`;

export const PasswordInput = styled.TextInput`
  flex: 1;
  padding: ${scale(10)}px;
  border-radius: ${scale(10)}px;
`;

export const LoginButton = styled.TouchableOpacity`
  padding: ${scale(10)}px;
  border-radius: ${scale(5)}px;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: ${scale(43)}px;
  margin-top: ${scale(20)}px;
`;

export const LoginText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const TroubleText = styled.Text`
  margin-top: ${scale(30)}px;
`;

export const Footer = styled.View`
  /* flex: 1; */
`;
