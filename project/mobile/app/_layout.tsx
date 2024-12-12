import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { persistor, store } from '~/rtk/state/store';
import "~/global.css"
import { colorScheme, useColorScheme } from "nativewind";
import { PersistGate } from 'redux-persist/integration/react';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {

  const { setColorScheme } = useColorScheme();
  setColorScheme("dark");

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>

        <Stack  screenOptions={{ headerShown: false }}>
          <Stack.Screen class="bg-neutral-800" name="(home)" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
