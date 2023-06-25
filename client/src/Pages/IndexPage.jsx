import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import axios from "axios";

const IndexPage = () => {
  const { userInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) {
        navigate("/login");
      }

      const response = await axios.get("http://localhost:4000/post");
      setPosts(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} />;
        })}
    </div>
  );
};

export default IndexPage;
