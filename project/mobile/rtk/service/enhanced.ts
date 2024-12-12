import { api as generatedApi } from './generated';

const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['Session', 'Speaker', 'UserFavorites'],
  endpoints: {
    Sessions: {
      providesTags: ['Session'],
    },
    UserFavorites: {
      providesTags: ['UserFavorites'],
    },
    FavoriteSessions: {
      providesTags: ['UserFavorites'],
    },
    CreateSession: {
      invalidatesTags: ['Session'],
    },
    MarkSessionAsFavorite: {
      invalidatesTags: ['UserFavorites'],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          enhancedApi.util.updateQueryData('UserFavorites', undefined, (draft) => {
            if (draft.me?.favorites?.map((item) => item.id).includes(id)) {
              const foundItem = draft.me.favorites.find((favorite) => favorite.id === id);
              if (foundItem) {
                draft.me.favorites = draft.me.favorites.filter((favorite) => favorite.id !== id);
              }
            } else {
              draft.me?.favorites?.push({ id });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    },
  },
});

export const {
  useMarkSessionAsFavoriteMutation,
  useUserFavoritesQuery,
  useSessionsQuery,
  useFavoriteSessionsQuery,
} = enhancedApi;

export { enhancedApi as api };
