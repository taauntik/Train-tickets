import React, { useState } from "react";
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
  const [newUser, setNewUser] = useState(false);
  // initalizing the firebase app
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  // event handler

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      isFieldValid = e.target.value.length > 6 && /\d{1}/.test(e.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      console.log(newUserInfo);
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          console.log(user);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log(user.name);
          updateUserName(user.name);
          history.replace(from);
          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          var errorMessage = error.message;
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const { displayName } = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.name = displayName;
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log("Sign in user info", user);
          history.replace(from);
          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          var errorMessage = error.message;
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log(user.name);
        console.log("User name updated successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const handleSubmit = (e) => {
  //   if (user.email && user.password) {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(user.email, user.password)
  //       .then((userCredential) => {
  //         // Signed in
  //         var { email } = userCredential.user;
  //         setUser({
  //           email: email,
  //         });
  //         console.log(email);
  //       })
  //       .catch((error) => {
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         console.log(errorCode, errorMessage);
  //       });
  //   }
  //   e.preventDefault();
  // };

  const handleGoogleSignIn = (e) => {
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
      <div>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
        />
        <label htmlFor="newUser">Create an account</label>
        <form onSubmit={handleSubmit}>
          <h3>{newUser ? "Create Account" : "Login"}</h3>
          {newUser && (
            <input
              type="text"
              onBlur={handleBlur}
              className="form-control"
              name="name"
              placeholder="Enter your name"
            />
          )}
          <br />
          <input
            onBlur={handleBlur}
            type="text"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            type="password"
            placeholder="Enter your password"
            className="form-control"
            name="password"
            required
          />
          <br />
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
        <p style={{ color: "red" }}>{user.error}</p>
        {user.success && (
          <p style={{ color: "green" }}>
            User {newUser ? "created" : "logged in"} successfully
          </p>
        )}
        <p>-----------------or--------------------</p>
        <button className="btn btn-primary" onClick={handleGoogleSignIn}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
