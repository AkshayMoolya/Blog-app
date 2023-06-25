import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    const response = await axios.post("http://localhost:4000/post", data, {
      withCredentials: true,
    });
    if (response) {
      setRedirect(true);
    }
  };

  if (redirect) {
    navigate("/");
  }

  return (
    <form action="" className="flex flex-col" onSubmit={createPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="block mb-2 w-full p-1 border-2 border-gray-400 rounded-md"
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        className="block mb-2 w-full p-1 border-2 border-gray-400 rounded-md"
      />
      <input
        type="file"
        className="mb-2"
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <ReactQuill
        value={content}
        modules={modules}
        onChange={(newValue) => setContent(newValue)}
      />
      <button className="bg-gray-700 text-white p-3 rounded-lg mt-2">
        Create post
      </button>
    </form>
  );
};

export default CreatePost;
