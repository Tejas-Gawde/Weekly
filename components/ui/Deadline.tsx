import { View } from "react-native";

import PoppinsRegular from "../Text/PoppinsRegular";

export default function Deadline({ children }: { children: React.ReactNode }) {
  return (
    <View>
      <PoppinsRegular style={{ color: "gray" }}>Deadline</PoppinsRegular>
      <PoppinsRegular style={{ color: "white", textAlign: "right" }}>{children}</PoppinsRegular>
    </View>
  );
}
