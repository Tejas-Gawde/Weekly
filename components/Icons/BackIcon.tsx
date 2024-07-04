import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export const BackIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  pressed: boolean;
}) => {
  const backgroundColor = props.pressed ? "hsl(0, 0%, 28%)" : "hsl(0, 0%, 16%)";
  return (
    <View
      style={{
        backgroundColor,
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 15,
        paddingBottom: 3,
        marginBottom: 15,
        marginTop: 15,
      }}>
      <Ionicons size={28} style={styles.tabBarIcon} {...props} />
    </View>
  );
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
