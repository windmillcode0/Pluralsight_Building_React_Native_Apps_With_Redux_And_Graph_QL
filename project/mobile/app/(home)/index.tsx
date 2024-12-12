import { router } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button } from '~/components/Button';
import { useMySessionsQuery, useSignOutMutation } from '~/rtk/service/generated';
import { removeCredentials } from '~/rtk/slices/authSlice';
import { useAppDispatch } from '~/rtk/state/store';

function renderItem({ item }: { item: SessionFragment | null }) {
  if (!item) {
    return null;
  }

  return (
    <View className="py-1">
      <View className="border border-gray-600 rounded-md p-3 gap-2 bg-neutral-800">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold text-white">
            {item.title} ({item.format})
          </Text>
          <Text className="text-gray-300">Level: {item.level}</Text>
        </View>
        <Text className="text-md text-gray-400">{item.description}</Text>
      </View>
    </View>

  );
}

export default function index() {
  const [signOut] = useSignOutMutation();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useMySessionsQuery();

  const mySessions = data?.me?.speaker?.sessions ?? [];
  const name = data?.me?.name;  

  if (isLoading) {
    return <ActivityIndicator />;
  }  

  return (
    <View className="p-2 flex-1 gap-2 justify-between bg-neutral-900">
      <View className="gap-4">
        <Text className="text-lg text-white">Welcome to the GDC, {name}!</Text>

        <View className="flex gap-3">
          <Text className="text-md font-bold text-gray-300">My Sessions</Text>
          {mySessions.length === 0 ? (
            <Text className="text-gray-400">You don't have any sessions. Head to the sessions screen to submit one!</Text>
          ) : (
            <FlatList data={mySessions} renderItem={renderItem} />
          )}
        </View>
      </View>

      <Button
        onPress={async () => {
          await signOut();

          // remove credentials
          dispatch(removeCredentials());

          router.replace('/');
        }}>
        <Text className="text-white">Sign Out</Text>
      </Button>
    </View>

  );
}
