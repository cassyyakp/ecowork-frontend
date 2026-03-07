import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login from "./authentification/Login";
import Dashboard from "./admin/Dashboard";
import Layout from "./admin/layout";
import Utilisateur from "./admin/Utilisateur";
import Facture from "./admin/Facture";
import Equipement from "./admin/Equipement";
import Reservation from "./admin/Reservation";
import EspaceLayout from "./admin/Espaces/EspaceLayout";
import AjoutEspace from "./admin/Espaces/AjoutEspace";

import "./index.css";
import ListeUtilisateur from "./admin/utilisateurs/ListeUtilisateur";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/utilisateurs" element={<Utilisateur />} />
          <Route path="/admin/espaces" element={<EspaceLayout />} />
          <Route path="/admin/espaces/ajout" element={<AjoutEspace />} />
          <Route path="/admin/equipements" element={<Equipement />} />
          <Route path="/admin/reservations" element={<Reservation />} />
          <Route path="/admin/factures" element={<Facture />} />

          <Route path="/admin/utilisateurs/listeUtilisateur" element={<ListeUtilisateur />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
