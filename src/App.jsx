import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login from "./authentification/Login";
import Dashboard from "./admin/Dashboard";
import Layout from "./admin/layout";
import Facture from "./admin/Facture";
import Espace from "./admin/Espace";
import Equipement from "./admin/Equipement";
import Reservation from "./admin/Reservation";
import ListeUtilisateur from "./admin/utilisateurs/ListeUtilisateur";
import EditUtilisateur from "./admin/utilisateurs/EditUtilisateur";
import ShowUtilisateur from "./admin/utilisateurs/ShowUtilisateur";
import CreateAdmin from "./admin/utilisateurs/CreateAdmin";





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
          <Route path="/admin/utilisateurs" element={<ListeUtilisateur />} />
          <Route path="/admin/utilisateurs/create" element={<CreateAdmin />} />
          <Route path="/admin/utilisateurs/:id" element={<ShowUtilisateur />} />
          <Route path="/admin/utilisateurs/:id/edit" element={<EditUtilisateur />} />
          <Route path="/admin/espaces" element={<Espace />} />
          <Route path="/admin/equipements" element={<Equipement />} />
          <Route path="/admin/reservations" element={<Reservation />} />
          <Route path="/admin/factures" element={<Facture />} />



        </Route>
      </Routes>
    </BrowserRouter>
  );
}