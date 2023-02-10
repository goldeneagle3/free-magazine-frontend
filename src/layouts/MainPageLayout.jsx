import React from "react";
import Navbar from "../components/navbar/Navbar";

import "./../styles/sass/main.scss";

const MainPageLayout = ({ children }) => {
  return (
    <div className="main_page_layout">
      <Navbar />
      {children}
    </div>
  );
};

export default MainPageLayout;
