import { configureStore } from "@reduxjs/toolkit";
import inspectionReducer from "../store/slices/inspection";

export const store = configureStore({
  reducer: {
    inspection: inspectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
