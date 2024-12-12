import { View, FlatList, Text, ActivityIndicator,Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useSpeakersQuery } from "~/rtk/service/generated";
function renderItem({ item: speaker }: { item: { id: string; name: string } }) {
  return (
    <View className="flex flex-row justify-center items-center gap-2">
      <Image
        className="h-12 w-12 rounded-xl"
        source={{
          uri: `https://i.pravatar.cc/150?u=${speaker.id}`,
        }}
      />

      <View className="flex justify-center">
        <Text>{speaker.name}</Text>
      </View>
      <View className="flex flex-row items-center">
        <Feather.Button
          name="heart"
          size={24}
          color="black"
          className="active:bg-slate-100 bg-white pr-0 mr-0"
          onPress={() => console.log(`Liked speaker ${speaker.id}`)}
        />
        <Feather.Button
          name="share"
          size={24}
          color="black"
          className="active:bg-slate-100 bg-white pr-0 mr-0"
          onPress={() => console.log(`Shared speaker ${speaker.id}`)}
        />
        <Feather.Button
          name="more-vertical"
          size={24}
          color="black"
          className="active:bg-slate-100 bg-white pr-0 mr-0"
          onPress={() => console.log(`Options for speaker ${speaker.id}`)}
        />
      </View>
    </View>
  );
}

const Separator = () => (
  <View className="h-px bg-gray-200 dark:bg-gray-700" />
);
export default function SpeakersScreen() {
  const { data, isLoading, refresh, isFetching,isError,error } = useSpeakersQuery();
  const speakers = data?.speakers ?? [];

  if (isLoading) {
    return <View className="flex flex-col flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>

  }

  if (isError) {
    return <View className="flex flex-col flex-1 justify-center items-center">
      <Text>{error.message}</Text>
    </View>
  }

  return (
    <View className="flex flex-column flex-1">
      <FlatList
        data={speakers}
        keyExtractor={(speaker) => speaker.id}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        onRefresh={refresh}
        refreshing={isFetching}
      />
    </View>
  );
}
