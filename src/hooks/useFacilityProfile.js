import { useState } from "react";
import { CITIES } from "../app/constants";
export function useFacilityProfile() {
  const stored = localStorage.getItem("aquacool-city") || "Mumbai";
  const [draftCity, setDraftCity] = useState(stored);
  const [city, setCity] = useState(stored);
  const [draftCapacity, setDraftCapacity] = useState(24);
  const [capacity, setCapacity] = useState(24);
  const applyChanges = () => {
    setCity(draftCity);
    setCapacity(Number(draftCapacity));
    localStorage.setItem("aquacool-city", draftCity);
  };
  return {
    city,
    capacity,
    draftCity,
    setDraftCity,
    draftCapacity,
    setDraftCapacity,
    profile: CITIES[city],
    draftProfile: CITIES[draftCity],
    applyChanges,
  };
}
