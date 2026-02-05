import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
