import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ArtistSlice } from './Slice/ArtistSlice';
import {SongSlice} from './Slice/SongSlice';
import {UserSlice} from './Slice/UserSlice';



const persistConfigArtist = { key: 'artist', storage, version: 1 };
const persistConfigSong = { key: 'song', storage, version: 1 };
const persistConfigUser = { key: 'user', storage, version: 1 };





const ArtistPersistReducer = persistReducer(persistConfigArtist, ArtistSlice.reducer);

const SongPersistReducer = persistReducer(persistConfigSong,SongSlice.reducer)
const UserPersistReducer = persistReducer(persistConfigUser,UserSlice.reducer)



export const store = configureStore({
  reducer: {
 
    artist: ArtistPersistReducer,
    song: SongPersistReducer,
    user: UserPersistReducer
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);