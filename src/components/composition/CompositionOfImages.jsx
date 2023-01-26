import React from "react";

import Sport from "./../../assets/img/sport.jpg";
import Law from "./../../assets/img/law.jpg";
import Din from "./../../assets/img/din.jpg";

import "./../../styles/sass/main.scss";

const CompositionOfImages = () => {
  return (
    <div className="composition">
      <img
        srcSet={`${Sport} 300w, ${Sport} 768w, ${Sport} 1280w, ${Sport} 3200w`}
        sizes="(max-width:900px) 20vw,(max-width:600px) 30vw,300px"
        alt="Foto One"
        className="composition__photo composition__photo--p1"
        // src={Logo}
      />
      <img
        srcSet={`${Law} 300w, ${Law} 768w, ${Law} 1280w, ${Law} 3200w`}
        sizes="(max-width:900px) 20vw,(max-width:600px) 30vw,300px"
        alt="Foto 2"
        className="composition__photo composition__photo--p2"
        // src={Logo}
      />
      <img
        srcSet={`${Din} 300w, ${Din} 768w, ${Din} 1280w, ${Din} 3200w`}
        sizes="(max-width:900px) 20vw,(max-width:600px) 30vw,300px"
        alt="Foto 3"
        className="composition__photo composition__photo--p3"
        // src={Logo}
      />
    </div>
  );
};

export default CompositionOfImages;
