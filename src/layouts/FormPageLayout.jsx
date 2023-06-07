import React from "react";
import ModernNavbar from "../components/navbar/ModernNavbar";
import Navbar from "../components/navbar/Navbar";

const FormPageLayout = ({ children }) => {
  return (
    <div className="form-page_layout">
      <Navbar />
      <ModernNavbar />
      {children}
    </div>
  );
};

export default FormPageLayout;
