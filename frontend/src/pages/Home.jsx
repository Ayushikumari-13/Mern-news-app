import { useEffect, useState } from "react";
import API from "../services/api";
import StoryCard from "../components/StoryCard";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const res = await API.get("/stories");

      console.log(res.data);

      if (Array.isArray(res.data)) {
        setStories(res.data);
      } else if (res.data.stories) {
        setStories(res.data.stories);
      } else {
        setStories([]);
      }

    } catch (error) {
      console.log(error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        🔥 Top Hacker News Stories
      </h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : stories.length === 0 ? (
        <h2>No Stories Found 😄</h2>
      ) : (
        stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
          />
        ))
      )}
    </div>
  );
};

export default Home;