import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"

      />
      <Stack.Screen
        name="new"
        options={{
          title: 'Create New Session',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
