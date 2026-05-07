import { useEffect, useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

const Bookmarks = () => {
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchBookmarks();
    }
  }, []);

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/stories/bookmarks/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          background: "#2563eb",
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Back To Home
      </Link>

      <h1>Bookmarked Stories 🔖</h1>

      {stories.map((story) => (
        <div
          key={story._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            background: "white",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>{story.title}</h2>

          <p>
            <strong>Author:</strong>{" "}
            {story.author}
          </p>

          <a
            href={story.url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              background: "#2563eb",
              color: "white",
              padding: "10px 15px",
              borderRadius: "8px",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;