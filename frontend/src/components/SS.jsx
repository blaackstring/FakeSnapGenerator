import React, { useRef } from 'react';
import html2canvas from 'html2canvas-pro';

const SS=({divRef})=>{
  

  const handleScreenshot = async () => {
    if (!divRef.current) return;

    const canvas = await html2canvas(divRef.current);
    const image = canvas.toDataURL('image/png');

    // Create a link and download
    const link = document.createElement('a');
    link.href = image;
    link.download = 'screenshot.png';
    link.click();
  };

  return (
    <div className="p-1">
      <button onClick={handleScreenshot} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Take Screenshot
      </button>

      <div
        ref={divRef}
        className="bg-yellow-100 p-4 rounded shadow w-fit"
      >
        <h2 className="text-lg font-bold">This section will be captured</h2>
        <p>This content will be part of the screenshot.</p>
      </div>
    </div>
  );
}

export default SS;
