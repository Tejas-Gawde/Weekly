import { View } from 'react-native';

import PoppinsRegular from './Text/PoppinsRegular';
import TaskCard from './ui/TaskCard';
import { FlashList } from '@shopify/flash-list';

export default function TaskList() {
  const tasks = [
    {
      time: '11:00am',
      title: 'Design team meeting',
      tags: ['call', 'team'],
      duration: '30 min',
      color: '#333333',
    },
    {
      time: '12:00am',
      title: 'Restaurant C&B. New Project Research',
      tags: ['ux design', 'brand', 'research'],
      duration: '2 hr',
      color: '#8E44AD',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
    {
      time: '3:00pm',
      title: 'Clients and managers meet. Fintech Company',
      tags: ['call', 'finance', 'pm communication'],
      duration: '1 hr',
      color: '#F1C40F',
    },
  ];
  return (
    <>
      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <PoppinsRegular style={{ fontSize: 30, color: 'white' }}>Task list</PoppinsRegular>
      </View>
      <FlashList
        data={tasks}
        renderItem={({ item, index }) => <TaskCard task={item} />}
        keyExtractor={(_, index) => index.toString()}
        estimatedItemSize={140}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
