import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { fetchInspections } from "./store/slices/inspection";
import { Routes, Route, Navigate } from "react-router-dom";
import InspectionRecord from "./pages/inspection-record";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchInspections());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/inspection-record" element={<InspectionRecord />} />
      <Route path="*" element={<Navigate to="/inspection-record" replace />} />
    </Routes>
  );
};

export default App;
