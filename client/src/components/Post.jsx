import React from "react";
import { format, formatISO, formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, content, createdAt, author, _id }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[0.9fr,1.1fr] gap-5 mb-3 w-9/10">
      <div className="w-full h-44 overflow-hidden ">
        <Link to={`/post/${_id}`}>
          <img
            className="w-full object-cover"
            src={"http://localhost:4000/" + cover}
            alt=""
          />
        </Link>
      </div>

      <div className="w-full h-full">
        <Link to={`/post/${_id}`}>
          <h2 className="font-bold text-xl line-clamp-2">{title}</h2>
        </Link>
        <p className="my-2 text-sm flex gap-2">
          <a className="font-bold text-gray-600 " href="s">
            {author.username}
          </a>
          <span>{format(new Date(createdAt), "MMM d, yyy HH:mm")}</span>
        </p>
        <p className="text">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
