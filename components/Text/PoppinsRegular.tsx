import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";

interface CustomTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const PoppinsRegular: React.FC<CustomTextProps> = ({ children, style }) => {
  const defaultStyles = { fontFamily: "Poppins-Regular" };
  const combinedStyles = [defaultStyles, style];
  return <Text style={combinedStyles}>{children}</Text>;
};

export default PoppinsRegular;
