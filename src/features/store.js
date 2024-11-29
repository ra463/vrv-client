import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import noteSlice from "./noteSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: adminSlice,
    note: noteSlice,
  },
});

const persistor = persistStore(store);

export { store, persistor };
