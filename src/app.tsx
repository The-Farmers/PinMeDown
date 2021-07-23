import logo from "./logo.svg";
import "./app.css";
import { createUser, userAlreadyExists } from "./api/methods/users";
import { User } from "./api/models";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const user: User = {
  name: "cynthialeeee",
};

try {
  userAlreadyExists(user).then((exists) => {
    if (exists) {
      console.log("EXISTS");
    } else {
      console.log("NOT EXISTS");
    }
  });

  // createUser(user);
} catch (error) {
  console.log("ERROR:", error);
}

export default App;
