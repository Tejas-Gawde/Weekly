import { View, StyleSheet } from 'react-native';
import { Input, TextArea, Theme, ToggleGroup } from 'tamagui';

import PoppinsRegular from './Text/PoppinsRegular';

interface TaskInputProps {
  setInputDescription: React.Dispatch<React.SetStateAction<string>>;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  setTaskPriority: React.Dispatch<React.SetStateAction<string>>;
}

export default function TaskInput({
  setInputDescription,
  setInputName,
  setTaskPriority,
}: TaskInputProps) {
  return (
    <View style={styles.container}>
      <PoppinsRegular style={styles.text}>Task Name</PoppinsRegular>
      <Input
        size="$4"
        borderWidth={1}
        width="90%"
        marginVertical={15}
        borderColor="gray"
        placeholder="Name cannot be empty"
        onChangeText={(text) => {
          setInputName(text);
        }}
      />
      <PoppinsRegular style={styles.text}>A short Description</PoppinsRegular>
      <TextArea
        textAlignVertical="top"
        size="$4"
        borderWidth={1}
        width="90%"
        marginVertical={15}
        borderColor="gray"
        placeholder="Description cannot be empty"
        onChangeText={(text) => setInputDescription(text)}
      />
      <PoppinsRegular style={styles.text}> Priority</PoppinsRegular>
      <Theme name="dark_purple">
        <ToggleGroup
          onValueChange={(value) => {
            setTaskPriority(value);
          }}
          marginVertical={15}
          type="single"
          size="$10"
          defaultValue="Low"
          backgroundColor="hsl(270, 93%, 83%)">
          <ToggleGroup.Item value="Low" padding={10}>
            <PoppinsRegular style={styles.priorityText}>Low</PoppinsRegular>
          </ToggleGroup.Item>
          <ToggleGroup.Item value="Medium" padding={10}>
            <PoppinsRegular style={styles.priorityText}>Medium</PoppinsRegular>
          </ToggleGroup.Item>
          <ToggleGroup.Item value="Hign" padding={10}>
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
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  priorityText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
