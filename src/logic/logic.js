// keeping it for future reference
export const generateBaseBoard = () => {
  const fingerboard = [
    //  1st string (High E)
    ['F', '', 'G', '',  'A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', '',  'A', '', 'B', 'C', '', 'D'],
    //  2nd string (B)
    ['C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', '', 'A'],
    //  3rd string (G)
    ['', 'A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B', 'C', '', 'D', '', 'E', 'F'],
    //  4th string (D)
    ['', 'E', 'F', '', 'G', '', 'A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B', 'C'],
    //  5th string (A)
    ['', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G'],
    //  6th string (Low E)
    ['F', '', 'G', '', 'A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B', 'C', '', 'D']
  ];
  generateNumber();
}

// keeping it for future reference
export const generateNumber = () => {
  const numberBoard = [
    // 1st string (High E)
    [1, '', 2, '', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, '', 3, 4, '', 5, '', 6],
    //  2nd string (B)
    [5, '', 6, '', 7, 1, '', 2, '', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, '', 3],
    //  3rd string (G)
    ['', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, '', 3, 4, '', 5, '', 6, '', 7, 1],
    //  4th string (D)
    ['', 7, 1, '', 2, '', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, '', 3, 4, '', 5],
    //  5th string (A)
    [4, '', 5, '', 6, '', 7, 1, '', 2, '', 3, 4, '', 5, '', 6, '', 7, 1, '', 2],
    //  6th string (Low E)
    [1, '', 2, '', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, '', 3, 4, '', 5, '', 6]
  ];
}

export const adjustNumberSetForKey = (key, frets) => {
  // Define the natural notes in order, starting from C to B
  if(key === ''){
    return;
  }
  const notes =  ['F', '', 'G', '',  'A', '', 'B', 'C', '', 'D', '', 'E'];
  // Get the index of the key in the notes array to determine the shift needed
  const keyIndex = notes.indexOf(key);
  if (keyIndex === -1) {
    console.error('Invalid key provided');
    return;
  }

  // Calculate shift from F to the target key
  const shiftFromF = (keyIndex - notes.indexOf('F')) % 12;

  // Original number sets for each string in F major, planned to be extended to 22 elements
  let numberSetForF = [
    [1, '', 2, '', 3, 4, '', 5, '', 6, '', 7], // 1st string (High E)
    [5, '', 6, '', 7, 1, '', 2, '', 3, 4, ''], // 2nd string (B)
    ['', 3, 4, '', 5, '', 6, '', 7, 1, '', 2], // 3rd string (G)
    ['', 7, 1, '', 2, '', 3, 4, '', 5, '', 6], // 4th string (D)
    [4, '', 5, '', 6, '', 7, 1, '', 2, '', 3], // 5th string (A)
    [1, '', 2, '', 3, 4, '', 5, '', 6, '', 7]  // 6th string (Low E)
  ];

  // Adjust the original number set for the specified key
  const adjustedNumberSet = numberSetForF.map(stringNumbers => {
    // Extend the sequence to ensure full coverage for shifting
    const extendedSequence = [...stringNumbers, ...stringNumbers, ...stringNumbers];
    // Calculate the slice indices for the adjusted sequence
    let start = stringNumbers.length - shiftFromF;
    let end = start + frets;
    const adjustedSequence = extendedSequence.slice(start, end);
    return adjustedSequence;
  });

  return adjustedNumberSet;
};

// find the start of the number set based on the string and degree
export const findStart = (adjustedNumberSet, stringP, degree) => {
  const row = adjustedNumberSet[stringP - 1];
  const index = row.indexOf(degree);
  return [stringP - 1, index];
}