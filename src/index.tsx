import { StrictMode } from "react";
import { render } from "react-dom";
import "./index.scss";
import { AuthProvider } from "./context/AuthContext";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./context/StateContext";

render(
  <StrictMode>
    <StateProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StateProvider>
  </StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
