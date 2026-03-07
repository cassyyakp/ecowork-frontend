import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login from "./authentification/Login";
import Dashboard from "./admin/Dashboard";
import Layout from "./admin/layout";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes avec sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/utilisateurs" element={<Dashboard />} />
          <Route path="/admin/espaces" element={<Dashboard />} />
          <Route path="/admin/equipements" element={<Dashboard />} />
          <Route path="/admin/reservations" element={<Dashboard />} />
          <Route path="/admin/factures" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}