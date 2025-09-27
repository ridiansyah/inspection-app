import { inspectionApi } from "../../services/inspection-api";
import { InspectionState } from "../../types/inspection";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: InspectionState = {
  records: [],
  loading: false,
  error: null,
  filters: {
    status: "Open",
    search: "",
  },
};

export const fetchInspections = createAsyncThunk(
  "inspection/fetchInspections",
  async () => {
    return await inspectionApi.fetchInspections();
  }
);

const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInspections.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchInspections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inspections";
      });
  },
});

export const { setStatusFilter, setSearchFilter, clearError } =
  inspectionSlice.actions;
export default inspectionSlice.reducer;
