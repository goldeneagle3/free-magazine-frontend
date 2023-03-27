import React from "react";
import ModernNavbar from "../components/navbar/ModernNavbar";
import Navbar from "../components/navbar/Navbar";

const ProfileLayout = ({ children }) => {
  return (
    <div className="profile_layout">
      <Navbar />
      <ModernNavbar />
      {children}
    </div>
  );
};

export default ProfileLayout;
