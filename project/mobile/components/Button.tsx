import { Ref, forwardRef } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
} & PressableProps;

export const Button = forwardRef<View, ButtonProps>(function Button({ children, ...rest }, ref) {
  return (
    <Pressable
      className={`
        text-md
        border-radius-1
        items-center
        justify-center
        bg-primary-500
        p-3
        `}
      {...rest}
      ref={ref}>
      <Text className="text-white">{children}</Text>
    </Pressable>
  );
});
