import { createContext, useContext, useState } from "react";

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState([]);

  const ajouterEspace = (espace) => {
    if (!panier.find((e) => e.id_espace === espace.id_espace)) {
      setPanier((prev) => [...prev, espace]);
    }
  };

  const retirerEspace = (id) => {
    setPanier((prev) => prev.filter((e) => e.id_espace !== id));
  };

  const viderPanier = () => setPanier([]);

  return (
    <PanierContext.Provider
      value={{ panier, ajouterEspace, retirerEspace, viderPanier }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}
