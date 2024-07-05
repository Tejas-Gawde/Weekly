import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Pressable } from "react-native";

import TaskInput from "~/components/TaskInput";
import PoppinsRegular from "~/components/Text/PoppinsRegular";
import TimePicker from "~/components/TimePicker";
import UploadPopup from "~/components/UploadPopup";
import WeekBoard from "~/components/WeekBoard";
import { UploadTask, convertToISOFromSelected } from "~/functions/helper";

const currentDate = dayjs().format("ddd DD");

export default function Add() {
  const [selectedTime, setSelectedTime] = useState({
    hours: "",
    minutes: "",
    amPm: "PM",
  });
  useEffect(() => {
    console.log(selectedTime);
  }, [selectedTime]);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const showModal = (newMessage: string) => {
    setMessage(newMessage);
    setModalVisible(true);
  };

  async function handleUpload() {
    if (
      inputName.trim() === "" ||
      inputDescription.trim() === "" ||
      error.trim() !== "" ||
      selectedTime.hours.trim() === "" ||
      selectedTime.minutes.trim() === ""
    ) {
      showModal("Some fields are either empty or invalid.");
      return;
    }
    const isoString = convertToISOFromSelected(selectedDate, selectedTime);
    try {
      UploadTask(inputName, inputDescription, taskPriority, isoString, selectedDate).then(() => {
        showModal("Task successfully added!");
        setSelectedDate(currentDate);
        setSelectedTime({
          hours: "",
          minutes: "",
          amPm: "PM",
        });
        setInputName("");
        setInputDescription("");
        setTaskPriority("Low");
      });
    } catch (error: any) {
      showModal(error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.styledContainer}>
        <WeekBoard
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          color="white"
          disabled
        />
      </View>
      <View style={styles.styledContainer}>
        <TimePicker
          error={error}
          setError={setError}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
        />
      </View>
      <View style={styles.styledContainer}>
        <TaskInput
          setInputName={setInputName}
          setInputDescription={setInputDescription}
          setTaskPriority={setTaskPriority}
          inputName={inputName}
          inputDescription={inputDescription}
          taskPriority={taskPriority}
        />
      </View>
      <Pressable
        style={styles.buttonStyle}
        android_ripple={{ color: "gray", borderless: false, foreground: true }}
        onPress={handleUpload}>
        <PoppinsRegular style={styles.buttonText}>Add Task</PoppinsRegular>
      </Pressable>
      <UploadPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={message}
        isEmptyMessage={message === ""}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "hsl(0, 0%, 11%)",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "45%",
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    paddingBottom: 90,
    borderWidth: 0,
    alignItems: "center",
  },
  styledContainer: {
    width: "95%",
    backgroundColor: "hsl(0, 0%, 11%)",
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    marginBottom: 25,
  },
});
