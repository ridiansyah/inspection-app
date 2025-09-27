import { inspectionApi } from "../../services/inspection-api";
import { InspectionRecord, InspectionState } from "../../types/inspection";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: InspectionState = {
  records: [],
  loading: false,
  loaded: false,
  error: null,
  filters: {
    status: "Open",
    search: "",
  },
};

export const fetchInspections = createAsyncThunk<
  InspectionRecord[], // return type
  void, // arg
  { state: RootState }
>(
  "inspection/fetchInspections",
  async (_: void, { signal, rejectWithValue }) => {
    try {
      const data = await inspectionApi.fetchInspections(signal); // ⬅️ kirim signal
      return data;
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        ("name" in err || "code" in err)
      ) {
        const errorObj = err as {
          name?: string;
          code?: string;
          message?: string;
        };
        if (
          errorObj.name === "CanceledError" ||
          errorObj.code === "ERR_CANCELED"
        ) {
          return rejectWithValue("Request canceled");
        }
        return rejectWithValue(
          errorObj.message ?? "Failed to fetch inspections"
        );
      }
      return rejectWithValue("Failed to fetch inspections");
    }
  },
  {
    // ⬅️ dedupe: kalau sudah pernah load atau sedang loading, jangan fetch lagi
    condition: (_: void, { getState }) => {
      const { inspection } = getState();
      if (inspection.loading || inspection.loaded) return false;
      return true;
    },
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
        state.loaded = true;
        state.records = action.payload;
      })
      .addCase(fetchInspections.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to fetch inspections";
      });
  },
});

export const { setStatusFilter, setSearchFilter, clearError } =
  inspectionSlice.actions;
export default inspectionSlice.reducer;
