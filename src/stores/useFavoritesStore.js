import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const useFavoriteStore = create(
  devtools(
    persist(
      set => ({
        favoriteIds: [],

        toggleFavorite: id =>
          set(
            state => ({
              favoriteIds: state.favoriteIds.includes(id)
                ? state.favoriteIds.filter(x => x !== id)
                : [...state.favoriteIds, id],
            }),
            false,
            'favorites/toggle'
          ),
        clearFavorites: () => set({ favoriteIds: [] }, false, 'favorites/clear'),
      }),
      {
        name: 'favorites-store',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'FavoritesStore' }
  )
);
