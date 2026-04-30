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
import UtilisateurLayout from "./utilisateur/UtilisateurLayout";
import Accueil from "./utilisateur/Accueil";
import ShowEspace from "./utilisateur/sectionEspace/ShowEspace";
import CreateReservation from "./utilisateur/reservation/CreateReservation";
import HistoriqueReservations from "./utilisateur/reservation/HistoriqueReservation";
import PrivateRoute from "./context/privateroute";
import ShowReservationUser from "./utilisateur/reservation/ShowReservationUser";
import Profil from "./utilisateur/Profil";
import PageEspaces from "./utilisateur/sectionEspace/PageEspace";
import AuthPage from "./authentification/AuthPage";
import PagePanier from "./utilisateur/Panier/PagePanier";
import { PanierProvider } from "./context/PanierContext";
import { AuthProvider } from "./context/authcontext";
import { Navigate } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <PanierProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/AuthPage" element={<AuthPage />} />

            <Route
              element={
                <PrivateRoute adminOnly>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route
                path="/admin/utilisateurs"
                element={<ListeUtilisateur />}
              />
              <Route
                path="/admin/utilisateurs/create"
                element={<CreateAdmin />}
              />
              <Route
                path="/admin/utilisateurs/:id"
                element={<ShowUtilisateur />}
              />
              <Route
                path="/admin/utilisateurs/:id/edit"
                element={<EditUtilisateur />}
              />
              <Route path="/admin/profil" element={<Profil />} />
              <Route path="/admin/espaces" element={<EspaceLayout />} />
              <Route path="/admin/espaces/show/:id" element={<EspaceShow />} />
              <Route
                path="/admin/espaces/update/:id"
                element={<EspaceUpdate />}
              />
              <Route path="/admin/espaces/ajout" element={<AjoutEspace />} />
              <Route
                path="/admin/reservations"
                element={<ReservationLayout />}
              />
              <Route
                path="/admin/reservations/show/:id"
                element={<ReservationShow />}
              />
              <Route
                path="/admin/reservations/update/:id"
                element={<ReservationUpdate />}
              />
              <Route path="/admin/equipements" element={<LayoutEquipement />} />
              <Route
                path="/admin/equipements/create"
                element={<CreateEquipement />}
              />
              <Route
                path="/admin/equipements/:id"
                element={<ShowEquipement />}
              />
              <Route
                path="/admin/equipements/:id/edit"
                element={<EditEquipement />}
              />
            </Route>

            <Route
              element={
                <PrivateRoute>
                  <UtilisateurLayout />
                </PrivateRoute>
              }
            >
              <Route path="/accueil" element={<Accueil />} />
              <Route path="/espaces" element={<PageEspaces />} />
              <Route path="/espaces/:id" element={<ShowEspace />} />
              <Route
                path="/reservations"
                element={<HistoriqueReservations />}
              />
              <Route
                path="/reservations/:id"
                element={<ShowReservationUser />}
              />
              <Route
                path="/reservations/create/:id"
                element={<CreateReservation />}
              />
              <Route path="/panier" element={<PagePanier />} />
              <Route path="/factures" element={<div>Factures</div>} />
              <Route path="/profil" element={<Profil />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PanierProvider>
    </AuthProvider>
  );
}

export default App;
