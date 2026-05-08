import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } =
    useContext(AuthContext);

  return (
    <nav
      style={{
        background: "#111827",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <h2
        style={{
          color: "white",
          margin: 0,
          fontSize: "32px",
        }}
      >
        MERN News
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={linkStyle}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={linkStyle}
        >
          Register
        </Link>

        <Link
          to="/bookmarks"
          style={linkStyle}
        >
          Bookmarks
        </Link>

        {token && (
          <button
            onClick={logout}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "18px",
};

export default Navbar;