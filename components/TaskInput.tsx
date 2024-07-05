import { View, StyleSheet } from "react-native";
import { Input, TextArea, Theme, ToggleGroup } from "tamagui";

import PoppinsRegular from "./Text/PoppinsRegular";

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
  return (
    <View style={styles.container}>
      <PoppinsRegular style={styles.text}>Title</PoppinsRegular>
      <Input
        value={inputName}
        maxLength={25}
        size="$4"
        borderWidth={0}
        width="90%"
        marginVertical={10}
        borderColor="white"
        placeholder="Max. 25 characters"
        onChangeText={(text) => {
          setInputName(text);
        }}
      />
      <PoppinsRegular style={styles.text}>Description</PoppinsRegular>
      <TextArea
        value={inputDescription}
        maxLength={45}
        textAlignVertical="top"
        size="$4"
        borderWidth={0}
        width="90%"
        marginVertical={15}
        borderColor="white"
        placeholder="Max. 45 characters"
        onChangeText={(text) => setInputDescription(text)}
      />
      <PoppinsRegular style={styles.text}> Priority</PoppinsRegular>
      <Theme name="light">
        <ToggleGroup
          value={taskPriority}
          disableDeactivation
          onValueChange={(value) => {
            setTaskPriority(value);
          }}
          marginVertical={10}
          type="single"
          size="$10"
          defaultValue="Low">
          <ToggleGroup.Item value="Low" padding={10} borderWidth={0.2}>
            <PoppinsRegular style={styles.priorityText}>Low</PoppinsRegular>
          </ToggleGroup.Item>
          <ToggleGroup.Item value="Medium" padding={10} borderWidth={0.2}>
            <PoppinsRegular style={styles.priorityText}>Medium</PoppinsRegular>
          </ToggleGroup.Item>
          <ToggleGroup.Item value="High" padding={10} borderWidth={0.2}>
            <PoppinsRegular style={styles.priorityText}>High</PoppinsRegular>
          </ToggleGroup.Item>
        </ToggleGroup>
      </Theme>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  priorityText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
});
