import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/styles/globals.css";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <main>
          <App />
        </main>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
