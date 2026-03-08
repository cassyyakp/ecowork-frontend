import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login from "./authentification/Login";
import Dashboard from "./admin/Dashboard";
import Layout from "./admin/layout";
import Facture from "./admin/Facture";
import Equipement from "./admin/Equipement";
import Reservation from "./admin/Reservation";
import EspaceLayout from "./admin/Espaces/EspaceLayout";
import AjoutEspace from "./admin/Espaces/AjoutEspace";
import EspaceShow from "./admin/Espaces/EspaceShow";
import EspaceUpdate from "./admin/Espaces/EspaceUpadate";
import ListeUtilisateur from "./admin/utilisateurs/ListeUtilisateur";
import EditUtilisateur from "./admin/utilisateurs/EditUtilisateur";
import ShowUtilisateur from "./admin/utilisateurs/ShowUtilisateur";
import CreateAdmin from "./admin/utilisateurs/CreateAdmin";
import "./index.css";
import LayoutEquipement from "./admin/equipements/LayoutEquipement";
import CreateEquipement from "./admin/equipements/CreateEquipement";
import EditEquipement from "./admin/equipements/EditEquipement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* Utilisateurs */}
          <Route path="/admin/utilisateurs" element={<ListeUtilisateur />} />
          <Route path="/admin/utilisateurs/create" element={<CreateAdmin />} />
          <Route path="/admin/utilisateurs/:id" element={<ShowUtilisateur />} />
          <Route path="/admin/utilisateurs/:id/edit" element={<EditUtilisateur />} />

          {/* Espaces */}
          <Route path="/admin/espaces" element={<EspaceLayout />} />
          <Route path="/admin/espaces/show/:id" element={<EspaceShow />} />
          <Route path="/admin/espaces/update/:id" element={<EspaceUpdate />} />
          <Route path="/admin/espaces/ajout" element={<AjoutEspace />} />

          {/* Equipements */}
          <Route path="/admin/equipements" element={<LayoutEquipement />} />
          <Route path="/admin/equipements/create" element={<CreateEquipement />} />
          <Route path="/admin/equipements/:id/edit" element={<EditEquipement />} />

          {/* Autres */}
          <Route path="/admin/reservations" element={<Reservation />} />
          <Route path="/admin/factures" element={<Facture />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}