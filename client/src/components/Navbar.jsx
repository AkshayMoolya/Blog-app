import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    if (!userInfo) {
      getData();
    }
  }, []);

  const getData = async () => {
    const data = await axios.get("http://localhost:4000/profile", {
      withCredentials: true,
    });
    setUserInfo(data);
  };

  const logout = () => {
    axios.post("http://localhost:4000/logout", { withCredentials: true });
    setUserInfo(null);
    return navigate("/login");
  };

  const username = userInfo?.username;

  return (
    <header className="flex justify-between mb-12 items-center">
      <Link className="no-underline font-bold text-2xl" to="/">
        MyBlog
      </Link>
      <nav className="flex gap-4">
        {username && (
          <>
            <Link to={"/create"}>create new post</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
