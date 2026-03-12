import { useState } from "react";
import { LowCarbonContext } from "./LowCarbonContext";

export function LowCarbonProvider({ children }) {
    const [lowCarbon, setLowCarbon] = useState(false);

    const toggle = () => {
        setLowCarbon(prev => !prev);
    };

    return (
        <LowCarbonContext.Provider value={{ lowCarbon, toggle }}>
            {children}
        </LowCarbonContext.Provider>
    );
}