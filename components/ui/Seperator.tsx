import { View, StyleSheet } from "react-native";

const Separator = ({ marginVertical = 10 }) => {
  return <View style={[styles.separator, { marginVertical }]} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%",
  },
});

export default Separator;
