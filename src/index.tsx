import { StrictMode } from "react";
import { render } from "react-dom";
<<<<<<< Updated upstream
import "./index.scss";
=======
import { AuthProvider } from "./provider/AuthProvider";
import "./index.css";
>>>>>>> Stashed changes
import App from "./app";
import reportWebVitals from "./reportWebVitals";

render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
