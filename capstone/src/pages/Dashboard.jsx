import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to your Dashboard!</h2>
      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
