import { useContext } from "react";
import { LowCarbonContext } from "./LowCarbonContext";

export function useLowCarbon() {
    return useContext(LowCarbonContext);
}