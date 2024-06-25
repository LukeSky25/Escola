import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistReducers = persistReducer(
    {
      key: 'REACT-BASE',
      storage,
      whitelist: ['exampleReducer'],
    },
    reducers
  );

  return persistReducers;
};
