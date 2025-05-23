import { useState } from "react";
import { auth, googleProvider } from "../lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signin(e) {
    try {
      e.preventDefault();

      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log("Something went very wrong!");
      }
    }
  }

  async function signinWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log("Something went very wrong!");
      }
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log("Something went very wrong!");
      }
    }
  }

  return (
    <div>
      <form onSubmit={signin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Signin</button>
      </form>

      <button onClick={signinWithGoogle}>Signin with google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
