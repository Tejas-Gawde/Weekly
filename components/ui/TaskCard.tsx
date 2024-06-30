import { View } from 'react-native';
import { Card } from 'tamagui';

import Deadline from './Deadline';
import Difficulty from './Difficulty';
import PoppinsRegular from '../Text/PoppinsRegular';
import PoppinsSemiBold from '../Text/PoppinsSemibold';

interface Task {
  time: string;
  title: string;
  tags: string[];
  duration: string;
  color: string;
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Card
        pressStyle={{ backgroundColor: 'hsl(0, 0%, 11%)' }}
        width="96%"
        height={140}
        backgroundColor="hsl(0, 0%, 11%)"
        borderRadius="$8"
        marginTop="$3">
        <Card.Header flexDirection="row" justifyContent="space-between">
          <PoppinsSemiBold style={{ color: 'white', fontSize: 16, width: '63%' }}>
            I dont know put some Text here
          </PoppinsSemiBold>
          <Difficulty>Medium</Difficulty>
        </Card.Header>
        <Card.Footer flexDirection="row" justifyContent="space-between" padded>
          <PoppinsRegular style={{ color: 'white', width: '63%', fontSize: 13 }}>
            This should be the description
          </PoppinsRegular>
          <Deadline>Today</Deadline>
        </Card.Footer>
      </Card>
    </View>
  );
}
