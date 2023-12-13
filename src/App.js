import React, { useState } from 'react';
import './App.css';

function App() {
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    setStartPos({ x: clientX, y: clientY });
    setEndPos({ x: clientX, y: clientY });
    setDrawing(true);

    // Log initial coordinates when drawing starts
    console.log(`Initial Coordinates: (${clientX}, ${clientY})`);
  };

  const handleMouseMove = (event) => {
    if (drawing) {
      const { clientX, clientY } = event;
      setEndPos({ x: clientX, y: clientY });
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);

    // Log final coordinates when drawing finishes
    console.log(`Final Coordinates: (${endPos.x}, ${endPos.y})`);
  };

  const getRectangleStyles = () => {
    const width = Math.abs(endPos.x - startPos.x);
    const height = Math.abs(endPos.y - startPos.y);
    const left = Math.min(startPos.x, endPos.x);
    const top = Math.min(startPos.y, endPos.y);

    return {
      position: 'absolute',
      border: '2px dashed #000',
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${left}px, ${top}px)`,
      pointerEvents: 'none', // Prevent the rectangle from capturing mouse events
    };
  };

  return (
    <div className="App">
      <h1>Create a Rectangle</h1>
      <div
        className="container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: 'relative',
          width: '500px',
          height: '300px',
          border: '1px solid #ccc',
        }}
      >
        <div style={getRectangleStyles()}></div>
        {drawing && (
          <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
            Start: {`(${startPos.x}, ${startPos.y})`}
            <br />
            Width: {Math.abs(endPos.x - startPos.x)}px
            <br />
            Height: {Math.abs(endPos.y - startPos.y)}px
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
