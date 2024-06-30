import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

interface CustomTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>; // Optional additional styles
}

const PoppinsSemiBold: React.FC<CustomTextProps> = ({ children, style }) => {
  const defaultStyles = { fontFamily: 'Poppins_600SemiBold' };
  const combinedStyles = [defaultStyles, style];
  return <Text style={combinedStyles}>{children}</Text>;
};

export default PoppinsSemiBold;
