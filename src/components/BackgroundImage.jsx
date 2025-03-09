import React from 'react';
import scalexImage from '../assets/scalex-design.png'; // Adjust the path accordingly

const BackgroundImage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image as a regular image */}
      <img
        src={scalexImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50" // Remove z-index to test visibility
      />
    </div>
  );
};

export default BackgroundImage;