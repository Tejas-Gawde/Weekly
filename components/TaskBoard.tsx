import { View } from 'react-native';
import { Button, Card } from 'tamagui';

import PoppinsRegular from './Text/PoppinsRegular';
import PoppinsSemiBold from './Text/PoppinsSemibold';

export default function TaskBoard() {
  return (
    <>
      <View style={{ paddingHorizontal: 24 }}>
        <Button
          borderRadius="$8"
          width="25%"
          height="$3"
          disabled
          backgroundColor="hsl(0, 0%, 16%)">
          Tasks
        </Button>
      </View>
      <View style={{ paddingTop: 20, paddingHorizontal: '2%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(163, 76%, 44%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>All tasks</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={{ fontSize: 34 }}>62</PoppinsSemiBold>
            </Card.Footer>
          </Card>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(0, 0%, 100%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>In Process</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={{ fontSize: 34 }}>32</PoppinsSemiBold>
            </Card.Footer>
          </Card>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(0, 0%, 100%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>Done</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={{ fontSize: 34 }}>16</PoppinsSemiBold>
            </Card.Footer>
          </Card>
          <Card width="48.5%" height={110} borderRadius="$8" backgroundColor="hsl(1, 70%, 56%)">
            <Card.Header padding="$3" paddingHorizontal="$4">
              <PoppinsRegular>To-do</PoppinsRegular>
            </Card.Header>
            <Card.Footer paddingHorizontal="$3.5">
              <PoppinsSemiBold style={{ fontSize: 34 }}>14</PoppinsSemiBold>
            </Card.Footer>
          </Card>
        </View>
      </View>
    </>
  );
}
