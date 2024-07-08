import { View, StyleSheet, ViewStyle, TextStyle, Pressable } from "react-native";

import PoppinsRegular from "~/components/Text/PoppinsRegular";

interface ToggleGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeButtonStyle?: ViewStyle;
  activeTextStyle?: TextStyle;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  onChange,
  containerStyle,
  buttonStyle,
  textStyle,
  activeButtonStyle,
  activeTextStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => (
        <Pressable
          key={option}
          style={[
            styles.button,
            buttonStyle,
            index === 0 && styles.leftButton,
            index === options.length - 1 && styles.rightButton,
            value === option && [styles.activeButton, activeButtonStyle],
          ]}
          onPress={() => onChange(option)}>
          <PoppinsRegular
            style={[
              styles.buttonText,
              textStyle,
              value === option && [styles.activeButtonText, activeTextStyle],
            ]}>
            {option}
          </PoppinsRegular>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  leftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  activeButton: {
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  activeButtonText: {
    fontFamily: "Poppins-SemiBold",
  },
});

export default ToggleGroup;
