import { forwardRef } from 'react';
import { Pressable } from 'react-native';

import { MenuIcon } from '../Icons/MenuIcon';

export const HeaderButton = forwardRef<typeof Pressable, { onPress?: () => void }>(
  ({ onPress }, ref) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => <MenuIcon pressed={pressed} name="segment" color="gray" />}
      </Pressable>
    );
  }
);
