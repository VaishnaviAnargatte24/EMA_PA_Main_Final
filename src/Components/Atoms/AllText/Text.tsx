import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

interface CustomTextProps {
  children?: ReactNode;
  style?: object;
  color?: string;
  fw: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  //   underline?: boolean;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onPress?: () => void;
  key?: string;
}

export const TitleText = (props: CustomTextProps) => {
  const TextStyle = {
    fontSize: scale(22),
    color: props.color,
    fontWeight: props.fw,
    textAlign: props.textAlign || 'left',
  };

  return (
    <Text
      style={{
        ...TextStyle,
        ...props.style,
        fontFamily: 'Geist-SemiBold',
      }}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const HeaderTitleText = (props: CustomTextProps) => {
  const TextStyle = {
    fontSize: scale(18),
    color: props.color,
    fontWeight: props.fw,
    textAlign: props.textAlign || 'left',
  };

  return (
    <Text
      style={{
        ...TextStyle,
        ...props.style,
        fontFamily: 'Geist-SemiBold',
      }}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

export const SubTitleText = (props: CustomTextProps) => {
  const TextStyle = {
    fontSize: scale(14),
    color: props.color,
    fontWeight: props.fw,
    textAlign: props.textAlign || 'left', // Use the textAlign prop, default to 'left'
  };
  return (
    <Text
      style={{
        ...TextStyle,
        ...props.style,
        fontFamily: 'Geist-Regular',
      }}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

export const BodyText = (props: CustomTextProps) => {
  const TextStyle = {
    fontSize: scale(14),
    color: props.color,
    fontWeight: props.fw,
    textAlign: props.textAlign || 'left', // Use the textAlign prop, default to 'left'
  };
  return (
    <Text
      style={{
        ...TextStyle,
        ...props.style,
        fontFamily: 'Geist-Regular',
      }}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

export const NormalText = (props: CustomTextProps) => {
  const TextStyle = {
    fontSize: scale(12),
    color: props.color,
    fontWeight: props.fw,
    textAlign: props.textAlign || 'left', // Use the textAlign prop, default to 'left'
  };
  return (
    <Text
      key={props.key}
      style={{
        ...TextStyle,
        ...props.style,
        fontFamily: 'Geist-Regular',
      }}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

export const EventTitleText = (props: CustomTextProps) => {
  const TextStyle = {
    fontSize: scale(12),
    color: props.color,
    fontWeight: props.fw,
    textAlign: props.textAlign || 'left', // Use the textAlign prop, default to 'left'
  };
  return (
    <Text
      key={props.key}
      style={{
        ...TextStyle,
        ...props.style,
        fontFamily: 'Geist-Medium',
      }}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
