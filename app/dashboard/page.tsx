import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user, loading, login, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
