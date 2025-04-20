import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ src, alt, className, style, aspectRatio = "4/3", ...props }) => {
  return (
    <div 
      className={`image-wrapper ${className || ""}`}
      style={{ 
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    >
      <LazyLoadImage
        src={src}
        alt={alt || "image"}
        effect="blur"
        wrapperClassName="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...style,
        }}
        {...props}
      />
    </div>
  );
};

export default Image;
