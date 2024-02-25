import React, { useRef, useEffect } from 'react';

const Fretboard = ({ adjustedNumberSet, startCordinate, surroundWidth }) => {
  const canvasRef = useRef(null);
  const startFret = startCordinate[1] - surroundWidth;
  const endFret = startCordinate[1] + surroundWidth + 1;
  const topMargin = 20; // Add a top margin
  const bottomMargin = 20; // Keep the existing bottom margin
  const totalMargin = topMargin + bottomMargin; // Total margin for the canvas
  const shift = 10; // shrink the surrounding box wit

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const frets = 22;
    const strings = adjustedNumberSet.length;
    const width = canvas.width;
    const height = canvas.height - totalMargin; // Adjust height to account for top and bottom margins
    const fretWidth = width / frets;
    const stringHeight = height / strings;

    // Function to draw the fretboard
    const drawFretboard = () => {
      ctx.clearRect(0, 0, width, height); // Clear the canvas
    
      // Draw the strings
      for (let i = 0; i < strings; i++) {
        ctx.beginPath();
        ctx.moveTo(0, stringHeight * (i + 0.5));
        ctx.lineTo(width, stringHeight * (i + 0.5));
        ctx.stroke();
      }
    
      // Draw the frets
      for (let i = 0; i <= frets; i++) {
        ctx.beginPath();
        if (i === 0) { // Check if this is the most left line
          ctx.lineWidth = 20; // Set the line width thicker for the first fret
        } else {
          ctx.lineWidth = 2; // Reset line width for other frets
        }
        ctx.moveTo(fretWidth * i, 0);
        ctx.lineTo(fretWidth * i, height);
        ctx.stroke();
      }
    };

    // Function to highlight a section of the fretboard
    const highlightSection = () => {
      ctx.save(); // Save the current state of the canvas
      ctx.strokeStyle = 'rgba(173, 216, 230, 0.5)'; // Light blue color for the rectangle outline
      ctx.lineWidth = 10; // Increased line width for a thicker outline
      ctx.strokeRect(fretWidth * startFret + shift, 0, fretWidth * (endFret - startFret) - 2 * shift, stringHeight * 6);
      ctx.restore(); // Restore the saved state, which reverts to the previous strokeStyle and lineWidth
    };

    // Function to draw fret numbers
    const drawFretNumbers = () => {
      ctx.fillStyle = 'black'; // Color of the fret numbers
      ctx.font = '12px Arial'; // Smaller font size for fret numbers
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top'; // Align text by the top of the text

      // Draw the numbers for each fret
      for (let i = 0; i < frets; i++) {
        ctx.fillText(i + 1, fretWidth * (i + 0.5), height + topMargin / 2);
      }
    };

    // Function to draw the scale degree numbers
    const drawNumbers = () => {
      ctx.fillStyle = 'black'; // Change the color of the numbers to black
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    
      adjustedNumberSet.forEach((string, stringIndex) => {
        string.forEach((fret, fretIndex) => {
          if (fret) {
            const x = fretWidth * (fretIndex + 0.5);
            const y = stringHeight * (stringIndex + 0.5);
    
            // Check if this is the number at startCordinate
            if (stringIndex === startCordinate[0] && fretIndex === startCordinate[1]) {
              ctx.fillStyle = 'yellow'; // Set the fill color for the highlighted number
              ctx.fillRect(x - fretWidth / 2, y - stringHeight / 2, fretWidth, stringHeight);
              ctx.fillStyle = 'black'; // Reset fill color for the numbers
            }
    
            ctx.fillText(fret, x, y);
          }
        });
      });
    };

    drawFretboard();
    highlightSection();
    drawNumbers();
    drawFretNumbers();
  }, [adjustedNumberSet, startCordinate, surroundWidth]);

  return (
    <canvas ref={canvasRef} width={1024} height={180 + totalMargin} />
  );
};

export default Fretboard;
