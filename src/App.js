import "./App.css";
import {
  BrowserRouter as Router,
  // Link,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import Destination from "./components/Destination/Destination";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
