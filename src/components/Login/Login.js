import React from "react";
// import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "./Login.css";
import firebaseConfig from "../../firebase.config";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

function Login() {
  const [user, setUser] = useContext(UserContext);
  // initalizing the firebase app
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  // event handler
  const handleBlur = (e) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = [e.target.value];
    setUser(newUserInfo);
  };

  const handleSubmit = (e) => {
    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
    e.preventDefault();
  };

  const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var { displayName, email } = result.user;
        setUser({
          name: displayName,
          email: email,
        });
        console.log(user);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
        />
        <input
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
        />
        <input type="submit" />
      </form>
      <Button onClick={googleSignIn}>Continue with Google</Button>
    </div>
  );
}

export default Login;
