import { InspectionRecord } from "../types/inspection";
import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const inspectionApi = {
  fetchInspections: async (): Promise<InspectionRecord[]> => {
    try {
      const response = await api.get("/inspections");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch inspections: ${error}`);
    }
  },
};
