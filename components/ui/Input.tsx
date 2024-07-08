import { forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

// Wrap your component with forwardRef
const Input = forwardRef<TextInput, TextInputProps>(({ style, ...props }, ref) => {
  return (
    <TextInput ref={ref} style={[styles.input, style]} placeholderTextColor="#999" {...props} />
  );
});

const styles = StyleSheet.create({
  input: {
    color: "white",
    flex: 1,
    backgroundColor: "hsl(0, 0%, 8%)",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: "90%",
  },
});

export default Input;
