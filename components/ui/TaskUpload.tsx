import { AlertDialog, Button, XStack, YStack } from 'tamagui';

import { convertToISOFromSelected } from '~/functions/helper';

interface uploadType {
  selectedDate: string;
  selectedTime: any;
  inputName: string;
  inputDescription: string;
  taskPriority: string;
}

export default function TaskUpload({
  selectedDate,
  selectedTime,
  inputName,
  inputDescription,
  taskPriority,
}: uploadType) {
  const isInputEmpty = inputName.trim() === '' || inputDescription.trim() === '';
  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || isInputEmpty || !taskPriority) {
      return;
    }
    console.log('Task submitted successfully!');
    const isoString = convertToISOFromSelected(selectedDate, selectedTime);
    console.log('ISO String:', isoString);
    console.log('Selected Day:', selectedDate.split(' ')[0]);
    console.log('Input Name:', inputName);
    console.log('Input Description:', inputDescription);
    console.log('Task Priority:', taskPriority);
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button alignSelf="center" size="$5" onPress={handleSubmit}>
          Add Task
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}>
          <YStack space>
            <AlertDialog.Description>
              {isInputEmpty
                ? 'Input Name and Description cannot be empty'
                : 'Task has been added successfully!'}
            </AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Action asChild>
                <Button theme="active">Okay</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
