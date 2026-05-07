import API from "../services/api";

const StoryCard = ({ story }) => {

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/stories/${story._id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Bookmarked Successfully");
    } catch (error) {
      console.log(error);

      alert("Login Required");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "14px",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          color: "#111827",
        }}
      >
        {story?.title}
      </h2>

      <p
        style={{
          color: "#374151",
        }}
      >
        <strong>Author:</strong> {story?.author}
      </p>

      <p
        style={{
          color: "#374151",
        }}
      >
        <strong>Points:</strong> {story?.points}
      </p>

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          gap: "10px",
        }}
      >
        <a
          href={story?.url}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            background: "#2563eb",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Read More
        </a>

        <button
          onClick={handleBookmark}
          style={{
            padding: "10px 15px",
            background: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Bookmark
        </button>
      </div>
    </div>
  );
};

export default StoryCard;