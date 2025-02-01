import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SelectedInstancesProvider from "./context/SelectedInstancesProvider.tsx";
import CheckoutModalProvider from "./context/CheckoutModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedInstancesProvider>
      <CheckoutModalProvider>
        <App />
      </CheckoutModalProvider>
    </SelectedInstancesProvider>
  </StrictMode>
);
