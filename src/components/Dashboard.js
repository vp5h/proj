import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "./authcomponents/contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import Task from "./TaskComponets/Tasks";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="w-100 text-center mt-2">
        <div className="w-100 text-center mt-2"> Hi ,{currentUser.email}</div>
        <Button className="mt-2 m-2" onClick={handleLogout}>
          Log Out
        </Button>

        <Link to="/update-profile">
          <Button className="mt-2 m-2">Update Profile</Button>
        </Link>
      </div>
      <Task />
    </>
  );
}
