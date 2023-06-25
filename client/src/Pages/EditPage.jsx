import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

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

const EditPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/post/${id}`);

    setTitle(response?.data?.title);
    setSummary(response?.data?.summary);
    setContent(response?.data?.content);
    setFiles(response?.data?.cover);
  };

  const EditPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const newData = await axios.put("http://localhost:4000/post", data, {
      withCredentials: true,
    });
    console.log(newData);
    if (newData.status === 200) {
      setRedirect(true);
    }
  };
  if (redirect) {
    navigate(`/post/${id}`);
  }
  return (
    <form action="" className="flex flex-col" onSubmit={EditPost}>
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
        Update Post
      </button>
    </form>
  );
};

export default EditPage;
