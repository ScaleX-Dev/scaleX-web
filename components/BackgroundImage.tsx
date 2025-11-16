'use client'
import React from 'react';
import Image from 'next/image';

const BackgroundImage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image as a regular image */}
      <Image
        src="/scalex-design.svg"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
        className="opacity-50"
      />
    </div>
  );
};

export default BackgroundImage;
