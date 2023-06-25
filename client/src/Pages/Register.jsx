import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const Register = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    const Userdata = await axios
      .post("http://localhost:4000/register", data)
      .then((response) => {
        if (response.status === 200) {
          alert("user created sucessfully");
        }
      })
      .catch((err) => {
        alert("Please try agin with different user name")
      });
  };

  return (
    <div>
      <form action="" className="max-w-md my-0 mx-auto" onSubmit={Register}>
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
