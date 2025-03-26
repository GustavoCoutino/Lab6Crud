import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Manager from "./Manager.jsx";
import Empleados from "./Empleados.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Empleados />
  </StrictMode>
);
