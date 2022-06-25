import React from "react";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  return (
    <div>
      <Navigate to="/login" replace={true} />
    </div>
  );
};
