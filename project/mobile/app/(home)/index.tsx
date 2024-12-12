import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '~/components/Button';
import { useSignOutMutation } from '~/rtk/service/generated';
import { removeCredentials } from '~/rtk/slices/authSlice';
import { useAppDispatch } from '~/rtk/state/store';

export default function index() {
  const [signOut] = useSignOutMutation();
  const dispatch = useAppDispatch();

  return (
    <View className="flex flex-col bg-neutral-900">
      <Text  className="text-white">Home Screen</Text>

      <Button
        onPress={async () => {
          await signOut();

          // remove credentials
          dispatch(removeCredentials());

          router.replace('/');
        }}>
        Sign Out
      </Button>
    </View>
  );
}
