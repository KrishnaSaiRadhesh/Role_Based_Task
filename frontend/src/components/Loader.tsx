// src/components/Loader.tsx
import React from "react";

// ? after text means "optional" prop (string | undefined)
type LoaderProps = {
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({ text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <span className="loader-text">{text}</span>
    </div>
  );
};

export default Loader;
