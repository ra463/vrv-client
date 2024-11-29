import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.scss";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { persistor, store } from "./features/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
