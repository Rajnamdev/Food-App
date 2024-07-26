import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/Store.js";
import { FirebaseProvider } from "./components/context/Firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <FirebaseProvider>
      <App />
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>
);