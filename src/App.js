import React, { useState } from 'react';
import * as logic from './logic/logic';
import Fretboard from './Fretboard';
import InfoDisplay from './InfoDisplay';
import './App.scss';

const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const STRINGS = ['4th', '5th', '6th'];
const DEGREES = ['Root', '2°', '3°', '4°', '5°', '6°', '7°'];
const FINGERS = ['Index (人差し指)', 'Middle (中指)', 'Ring (薬指)', 'Pinky (小指)'];
// const SCALES = ['Major', 'Natural Minor', 'Harmonic Minor', 'Altered', 'Dorian', 'Melodic Minor', 'Mixolydian', 'Lydian b7th'];
const SCALES = ['Major'];
const FRETS = 17; // We can set to 22, but 22 is too long for mobile screen.

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const GuitarScalePractice = () => {
  const [combination, setCombination] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [delay, setDelay] = useState(5000); // Default delay of 5 seconds
  const [fingerboard, setFingerboard] = useState([]);
  const [startCordinate, setStartCordinate] = useState([0, 0]);

  const generateCombination = () => {
    const note = getRandomElement(NOTES);
    const degree = getRandomElement(DEGREES);
    const finger = getRandomElement(FINGERS);
    const string = getRandomElement(STRINGS);
    const scale = getRandomElement(SCALES);

    const newCombination = { note, degree, finger, string, scale };
    setCombination(newCombination);
    setShowAnswer(false);

    // Generate the adjusted number set for the key (note) selected
    const adjustedNumberSet = logic.adjustNumberSetForKey(note, FRETS);
    setFingerboard(adjustedNumberSet);

    // Convert the string name to the appropriate number for the tuning
    const stringNumber = ['1st', '2nd', '3rd', '4th', '5th', '6th'].indexOf(string) + 1; // Convert string name to string number (1-6)
    const degreeNumber = ['Root', '2°', '3°', '4°', '5°', '6°', '7°'].indexOf(degree) + 1; // Convert degree name to degree number (1-7)
    // Find the starting coordinate based on the string number and the degree
    const start = logic.findStart(adjustedNumberSet, stringNumber, degreeNumber);

    // Set the start coordinate state to trigger re-render of the Fretboard component
    setStartCordinate(start);

    // Show the answer after the specified delay
    const timer = setTimeout(() => {
      setShowAnswer(true);
    }, delay);

    // Clear the timeout if the component unmounts or the button is clicked again
    return () => clearTimeout(timer);
  };

  // Extract values for display
  const { note, degree, finger, string, scale } = combination;

  return (
    <div className="parent-container">
      <div className="info-box">
        <div className='title-section'>
          <h1 className='title'>Guitar Scale Practice</h1>
          <button onClick={generateCombination}>Start!</button>
        </div>
        <InfoDisplay label="Key" value={note || ''} />
        <InfoDisplay label="Scale" value={scale || ''} />
        <InfoDisplay label="Degree" value={degree || ''} />
        <InfoDisplay label="String" value={string || ''} />
        <InfoDisplay label="Finger" value={finger || ''} />
      </div>
      {showAnswer && (
        <div className="canvas-container">
          <Fretboard
            adjustedNumberSet={fingerboard}
            startCordinate={startCordinate}
            surroundWidth={3}
            frets={FRETS}
          />
        </div>
      )}
    </div>
  );
};

export default GuitarScalePractice;
