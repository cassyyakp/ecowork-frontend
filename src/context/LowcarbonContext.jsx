import { createContext, useContext, useState } from "react";

const LowCarbonContext = createContext();

export function LowCarbonProvider({ children }) {
  const [lowCarbon, setLowCarbon] = useState(false);

  const toggle = () => {
    setLowCarbon((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("low-carbon");
      } else {
        document.documentElement.classList.remove("low-carbon");
      }
      return next;
    });
  };

  return (
    <LowCarbonContext.Provider value={{ lowCarbon, toggle }}>
      {children}
    </LowCarbonContext.Provider>
  );
}

export function useLowCarbon() {
  return useContext(LowCarbonContext);
}
