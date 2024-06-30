import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PortalProvider, Separator } from 'tamagui';

import TaskInput from '~/components/TaskInput';
import TimePicker from '~/components/TimePicker';
import WeekBoard from '~/components/WeekBoard';
import TaskUpload from '~/components/ui/TaskUpload';

const currentDate = dayjs().format('ddd DD');

export default function Add() {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState({
    hours: 12,
    minutes: 0o0,
    amPm: 'AM',
  });
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');

  useEffect(() => {
    console.log(selectedTime);
  }, [selectedTime]);

  return (
    <PortalProvider shouldAddRootHost>
      <ScrollView contentContainerStyle={styles.container}>
        <WeekBoard setSelectedDate={setSelectedDate} selectedDate={selectedDate} color="white" />
        <Separator marginVertical={13} marginHorizontal="3%" />
        <TimePicker setSelectedTime={setSelectedTime} selectedTime={selectedTime} />
        <Separator marginVertical={13} marginHorizontal="3%" />
        <TaskInput
          setInputName={setInputName}
          setInputDescription={setInputDescription}
          setTaskPriority={setTaskPriority}
        />
        <TaskUpload
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          inputName={inputName}
          inputDescription={inputDescription}
          taskPriority={taskPriority}
        />
      </ScrollView>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 90,
    borderWidth: 0,
  },
});
