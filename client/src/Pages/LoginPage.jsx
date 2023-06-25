import React, { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const login = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    const response = await axios
      .post("http://localhost:4000/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data);
        setredirect(true);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert("Wrong credentials");
        }
      });
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form action="" className="max-w-md my-0 mx-auto" onSubmit={login}>
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="block mb-1 w-full p-1 border-2 border-gray-400 rounded-md"
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
          className="block  w-full p-1 border-2 border-gray-400 rounded-md mb-3"
        />
        <button className="block w-full bg-gray-700 border-0 text-white rounded-md p-1">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
