import { View, StyleSheet } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";
import Input from "./ui/Input";
import ToggleGroup from "./ui/ToggleGroup"; // Import the new ToggleGroup component

interface TaskInputProps {
  setInputDescription: React.Dispatch<React.SetStateAction<string>>;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  setTaskPriority: React.Dispatch<React.SetStateAction<string>>;
  inputName: string;
  inputDescription: string;
  taskPriority: string;
}

export default function TaskInput({
  setInputDescription,
  setInputName,
  setTaskPriority,
  inputName,
  inputDescription,
  taskPriority,
}: TaskInputProps) {
  const priorities = ["Low", "Medium", "High"];

  return (
    <View style={styles.container}>
      <PoppinsRegular style={styles.text}>Title</PoppinsRegular>
      <Input
        value={inputName}
        maxLength={25}
        placeholder="Max. 25 characters"
        onChangeText={setInputName}
      />
      <PoppinsRegular style={styles.text}>Description</PoppinsRegular>
      <Input
        value={inputDescription}
        maxLength={65}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        style={styles.textArea}
        placeholder="Max. 65 characters"
        onChangeText={setInputDescription}
      />
      <PoppinsRegular style={styles.text}>Priority</PoppinsRegular>
      <ToggleGroup
        options={priorities}
        value={taskPriority}
        onChange={setTaskPriority}
        containerStyle={styles.toggleGroup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  textArea: {
    height: 100,
  },
  toggleGroup: {
    width: "100%",
    maxWidth: 300, // Adjust as needed
  },
});
