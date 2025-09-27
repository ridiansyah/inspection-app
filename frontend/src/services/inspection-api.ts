import { InspectionRecord } from "../types/inspection";
import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const inspectionApi = {
  fetchInspections: async (
    signal?: AbortSignal
  ): Promise<InspectionRecord[]> => {
    try {
      const response = await api.get("/inspections", { signal });
      return response.data;
    } catch (error: unknown) {
      if (axios.isCancel?.(error)) throw error;
      let message = "Unknown error";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as { message?: string }).message ?? String(error);
      } else {
        message = String(error);
      }
      throw new Error(`Failed to fetch inspections: ${message}`);
    }
  },
};
