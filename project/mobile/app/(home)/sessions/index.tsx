import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, Button } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useMarkSessionAsFavoriteMutation, useSessionsQuery, useUserFavoritesQuery } from "~/rtk/service/enhanced";
import {Link } from 'expo-router';
function renderItem({ item: session }: { item: { 
  id: string; 
  title: string, 
  markFavorite: () => void
  isFavorite: boolean
} }) {
  return (
    <View className="flex flex-row bg-white items-center justify-between p-2">
      <View className="flex justify-center">
        <Text>{session.title}</Text>
      </View>
      <View className="flex flex-row items-center">
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => {
            console.log(`Favorited session ${session.id}`);
            session.markFavorite();
          }}
        >
          <Feather name={session.isFavorite ? 'heart' : 'circle'} size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => console.log(`Shared session ${session.id}`)}
        >
          <Feather name="share" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => console.log(`Options for session ${session.id}`)}
        >
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Separator = () => (
  <View className="h-px bg-gray-200 dark:bg-gray-700" />
);
export default function SessionsScreen() {
  const [markFavorite] = useMarkSessionAsFavoriteMutation()
  const { data, isLoading, refresh, isFetching } = useSessionsQuery();
  const { data: myInfo, isLoading: myInfoLoading } = useUserFavoritesQuery();
  const sessions = data?.sessions ?? [];


  if (isLoading || myInfoLoading) {
    return <View className="flex flex-col flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }
  const myFavorites = myInfo?.me?.favorites?.map((item) => item.id) ?? [];

  return (
    <View className="flex flex-column flex-1">
      <FlatList
        data={sessions.map((session) => ({
          ...session,
          title: session.title.length > 30
            ? session.title.substring(0, 30) + '...'
            : session.title,
          markFavorite: () => markFavorite({ id: session.id }),
          isFavorite: myFavorites.includes(session.id),
        }))}
        keyExtractor={(session) => session.id}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        onRefresh={refresh}
        refreshing={isFetching}
        keyboardShouldPersistTaps="handled"
      />
      <View className="p-4">
        <Link href="/(home)/sessions/new" asChild>
          <Button title="Create New Session"></Button>
        </Link>
      </View>      
    </View>
  );
}