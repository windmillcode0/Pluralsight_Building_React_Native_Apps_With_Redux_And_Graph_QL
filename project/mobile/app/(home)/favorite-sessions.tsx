import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavoriteSessionsQuery, useMarkSessionAsFavoriteMutation } from '~/rtk/service/enhanced';

function renderItem({
  item: session,
}: {
  item: { id: string; title: string; removeFavorite: () => void };
}) {
  return (
    <View className="flex flex-row bg-neutral-900 items-center justify-between p-2">
      <View className="flex justify-center">
        <Text className="text-white">{session.title}</Text>
      </View>
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => console.log('Share pressed')}>
          <Feather
            name="share"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={session.removeFavorite}>
          <Feather
            name="delete"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Separator = () => <View className={`h-[1px] bg-gray-200`} />;

export default function FavoriteSessionsScreen() {
  const [removeFavorite] = useMarkSessionAsFavoriteMutation();
  const { data, isLoading, refetch, isFetching } = useFavoriteSessionsQuery();

  if (isLoading) {
    return (
      <View className={`flex flex-column flex-1 justify-center items-center`}>
        <ActivityIndicator />
      </View>
    );
  }

  const myFavorites = data?.me?.favorites ?? [];

  return (
    <View className={`flex flex-column flex-1`}>
      <FlatList
        data={myFavorites.map((session) => ({
          ...session,
          title: session.title.length > 30 ? session.title.substring(0, 30) + '...' : session.title,
          removeFavorite: () => removeFavorite({ id: session.id }),
        }))}
        keyExtractor={(session) => session.id}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
}
