import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Logbar from "../../Components/Logbar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });

      if (response.status === 201) {
        const data = response.json()
        const token = ("access_token", data.token)
        Cookies.set("access_token", token)
      } else {
        alert("failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Logbar />
      <center>
        <h1 style={{ marginTop: 120 }}>Login</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
            marginTop: 40
          }}
        ></input>
        <br />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={{
            width: "400px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "#f4f4f4",
            padding: "2px 10px",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        ></input>
        <br />
        <button
          type="submit"
          onClick={handleLogin}
          style={{
            width: "420px",
            height: "36px",
            borderRadius: "100px",
            border: "1px solid grey",
            backgroundColor: "#1944a1",
            padding: "2px 10px",
            fontSize: "14px",
            marginTop: "30px",
            color: "#fff",
            fontWeight: 600,
            letterSpacing: 1
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}
