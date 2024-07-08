import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";

import PoppinsRegular from "./Text/PoppinsRegular";
import Input from "./ui/Input";

interface TimePickerProps {
  setSelectedTime: Dispatch<SetStateAction<{ hours: string; minutes: string; amPm: string }>>;
  selectedTime: { hours: string; minutes: string; amPm: string };
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const TimePicker: React.FC<TimePickerProps> = ({
  setSelectedTime,
  selectedTime,
  error,
  setError,
}) => {
  const [hourInput, setHourInput] = useState("");
  const [minuteInput, setMinuteInput] = useState("");
  const minRef = useRef<TextInput>(null);

  useEffect(() => {
    validateTime();
  }, [selectedTime]);

  useEffect(() => {
    setHourInput(selectedTime.hours.toString());
    setMinuteInput(selectedTime.minutes.toString());
  }, [selectedTime.hours, selectedTime.minutes]);

  const validateTime = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    let selectedHours = parseInt(selectedTime.hours, 10);
    if (selectedTime.amPm === "PM" && selectedHours !== 12) {
      selectedHours += 12;
    } else if (selectedTime.amPm === "AM" && selectedHours === 12) {
      selectedHours = 0;
    }

    const selectedMinutes = parseInt(selectedTime.minutes, 10);

    if (
      selectedHours < currentHours ||
      (selectedHours === currentHours && selectedMinutes < currentMinutes)
    ) {
      setError("Selected time cannot be earlier than the current time");
    } else {
      setError("");
    }
  };

  const handleAmPmChange = () => {
    setSelectedTime((prevSelectedTime) => ({
      ...prevSelectedTime,
      amPm: prevSelectedTime.amPm === "AM" ? "PM" : "AM",
    }));
  };

  const handleHourChange = (text: string) => {
    const hour = text ? parseInt(text, 10) : NaN;
    setHourInput(text);
    if (isNaN(hour)) {
      setError("");
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        hours: "",
      }));
    } else if (hour < 1 || hour > 12) {
      setError("Hour must be between 1 and 12");
    } else {
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        hours: hour.toString(),
      }));
    }
  };

  const handleMinuteChange = (text: string) => {
    const minute = text ? parseInt(text, 10) : NaN;
    setMinuteInput(text);
    if (isNaN(minute)) {
      setError("");
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        minutes: "",
      }));
    } else if (minute < 0 || minute > 59) {
      setError("Minute must be between 00 and 59");
    } else {
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        minutes: minute.toString(),
      }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timePicker}>
        <Input
          returnKeyType="next"
          value={hourInput}
          maxLength={2}
          keyboardType="numeric"
          placeholder="12"
          onChangeText={handleHourChange}
          onSubmitEditing={() => minRef.current?.focus()}
        />
        <Input
          ref={minRef}
          value={minuteInput}
          maxLength={2}
          keyboardType="numeric"
          placeholder="00"
          onChangeText={handleMinuteChange}
        />
        <Pressable
          android_ripple={{ color: "gray", borderless: false, foreground: true }}
          style={styles.button}
          onPress={handleAmPmChange}>
          <PoppinsRegular style={styles.buttonText}>{selectedTime.amPm}</PoppinsRegular>
        </Pressable>
      </View>
      {error ? <PoppinsRegular style={styles.error}>{error}</PoppinsRegular> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  timePicker: {
    flexDirection: "row",
    gap: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  button: {
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 2,
    color: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    width: 25,
  },
});

export default TimePicker;
