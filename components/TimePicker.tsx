import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from 'tamagui';

import PoppinsRegular from './Text/PoppinsRegular';

interface TimePickerProps {
  setSelectedTime: Dispatch<SetStateAction<{ hours: number; minutes: number; amPm: string }>>;
  selectedTime: { hours: number; minutes: number; amPm: string };
}

const TimePicker: React.FC<TimePickerProps> = ({ setSelectedTime, selectedTime }) => {
  const [error, setError] = useState('');

  const handleAmPmChange = () => {
    if (selectedTime.amPm === 'AM') {
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        amPm: 'PM',
      }));
    } else {
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        amPm: 'AM',
      }));
    }
  };

  const handleHourChange = (text: string) => {
    const hour = text ? parseInt(text, 10) : NaN;
    if (isNaN(hour)) {
      setError('');
    } else if (hour < 1 || hour > 12) {
      setError('Hour must be between 1 and 12');
    } else {
      setError('');
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        hours: hour,
        amPm: selectedTime.amPm,
      }));
    }
  };

  const handMinuteChange = (text: string) => {
    const minute = text ? parseInt(text, 10) : NaN;
    if (isNaN(minute)) {
      setError('');
    } else if (minute < 0 || minute > 59) {
      setError('Minute must be between 00 and 59');
    } else {
      setError('');
      setSelectedTime((prevSelectedTime) => ({
        ...prevSelectedTime,
        minutes: minute,
        amPm: selectedTime.amPm,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <PoppinsRegular style={styles.text}>Time</PoppinsRegular>
      <View style={styles.timePicker}>
        <Input
          defaultValue="12"
          maxLength={2}
          keyboardType="numeric"
          flex={1}
          size={1}
          borderWidth={1}
          borderColor="gray"
          placeholder="12"
          onChangeText={handleHourChange}
        />
        <Input
          defaultValue="00"
          maxLength={2}
          keyboardType="numeric"
          flex={1}
          size={1}
          borderWidth={1}
          borderColor="gray"
          placeholder="00"
          onChangeText={handMinuteChange}
        />
        <Button width={62} onPress={handleAmPmChange}>
          {selectedTime.amPm}
        </Button>
      </View>
      {error ? <PoppinsRegular style={styles.error}>{error}</PoppinsRegular> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    paddingVertical: 10,
  },
  timePicker: {
    flexDirection: 'row',
    gap: 10,
    width: '90%',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default TimePicker;
