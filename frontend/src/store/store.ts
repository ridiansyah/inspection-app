import { configureStore } from "@reduxjs/toolkit";
import inspectionReducer from "../store/slices/inspection";
import mastersReducer from "../store/slices/masters";

export const store = configureStore({
  reducer: {
    inspection: inspectionReducer,
    masters: mastersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
