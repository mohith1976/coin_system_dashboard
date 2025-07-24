import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";  // ✅ Ensure correct file name
import Dashboard from "./pages/Dashboard";  // ✅ Import Dashboard

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
