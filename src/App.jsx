import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login from "./authentification/Login";
import Dashboard from "./admin/Dashboard";
import Layout from "./admin/layout";
import Utilisateur from "./admin/Utilisateur";
import Facture from "./admin/Facture";
import Espace from "./admin/Espace";
import Equipement from "./admin/Equipement";
import Reservation from "./admin/Reservation";



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
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/utilisateurs" element={<Utilisateur />} />
          <Route path="/admin/espaces" element={<Espace />} />
          <Route path="/admin/equipements" element={<Equipement />} />
          <Route path="/admin/reservations" element={<Reservation />} />
          <Route path="/admin/factures" element={<Facture />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}