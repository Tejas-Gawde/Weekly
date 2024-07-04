import { StyleSheet, View } from "react-native";

import PoppinsSemiBold from "../Text/PoppinsSemibold";

export default function Priority({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <PoppinsSemiBold style={styles.text}>{children}</PoppinsSemiBold>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(270, 93%, 83%)",
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
  },
});
