import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login from "./authentification/Login";
import Dashboard from "./admin/Dashboard";
import Layout from "./admin/layout";
import EspaceLayout from "./admin/Espaces/EspaceLayout";
import AjoutEspace from "./admin/Espaces/AjoutEspace";
import EspaceShow from "./admin/Espaces/EspaceShow";
import EspaceUpdate from "./admin/Espaces/EspaceUpadate";
import ListeUtilisateur from "./admin/utilisateurs/ListeUtilisateur";
import EditUtilisateur from "./admin/utilisateurs/EditUtilisateur";
import ShowUtilisateur from "./admin/utilisateurs/ShowUtilisateur";
import CreateAdmin from "./admin/utilisateurs/CreateAdmin";
import ReservationLayout from "./admin/Reservations/ReservationLayout";
import ReservationShow from "./admin/Reservations/ReservationShow";
import ReservationUpdate from "./admin/Reservations/ReservationUpdate";
import LayoutEquipement from "./admin/equipements/LayoutEquipement";
import CreateEquipement from "./admin/equipements/CreateEquipement";
import EditEquipement from "./admin/equipements/EditEquipement";
import ShowEquipement from "./admin/equipements/ShowEquipement";
import FactureLayout from "./admin/Factures/FactureLayout";
import FactureShow from "./admin/Factures/FactureShow";
import "./index.css";
import LayoutBanner from "./utilisateur/header/banner/LayoutBanner";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


          <Route path="/accueil" element={<LayoutBanner />} />


        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* Utilisateurs */}
          <Route path="/admin/utilisateurs" element={<ListeUtilisateur />} />
          <Route path="/admin/utilisateurs/create" element={<CreateAdmin />} />
          <Route path="/admin/utilisateurs/:id" element={<ShowUtilisateur />} />
          <Route
            path="/admin/utilisateurs/:id/edit"
            element={<EditUtilisateur />}
          />

          {/* Espaces */}
          <Route path="/admin/espaces" element={<EspaceLayout />} />
          <Route path="/admin/espaces/show/:id" element={<EspaceShow />} />
          <Route path="/admin/espaces/update/:id" element={<EspaceUpdate />} />
          <Route path="/admin/espaces/ajout" element={<AjoutEspace />} />

          {/* Réservations */}
          <Route path="/admin/reservations" element={<ReservationLayout />} />
          <Route
            path="/admin/reservations/show/:id"
            element={<ReservationShow />}
          />
          <Route
            path="/admin/reservations/update/:id"
            element={<ReservationUpdate />}
          />

          {/* Equipements */}
          <Route path="/admin/equipements" element={<LayoutEquipement />} />
          <Route
            path="/admin/equipements/create"
            element={<CreateEquipement />}
          />
          <Route path="/admin/equipements/:id" element={<ShowEquipement />} />
          <Route
            path="/admin/equipements/:id/edit"
            element={<EditEquipement />}
          />

          {/* Factures */}
          <Route path="/admin/factures" element={<FactureLayout />} />
          <Route path="/admin/factures/show/:id" element={<FactureShow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
