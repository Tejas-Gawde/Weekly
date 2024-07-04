import Octicons from "@expo/vector-icons/Octicons";
import { StyleSheet } from "react-native";

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Octicons>["name"];
  color: string;
}) => {
  return <Octicons size={28} style={styles.tabBarIcon} {...props} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
