

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {

 const board = [];
  for (i = 0; i < numberOfRows; i++) {
    const row = [];
    for (k = 0; k < numberOfColumns; k++) {
    row.push(' ');
    }
    board.push(row);
  }

 return board;
};


const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {

 const board = [];
  for (i = 0; i < numberOfRows; i++) {
    const row = [];
    for (k = 0; k < numberOfColumns; k++) {
    row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
   while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
     if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
     //edit to add control flow, bombs on bombs err
     }
   }

  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {

  const neighborOffsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [0,  -1],          [0,  1],
    [1,  -1], [1,  0], [1,  1]
  ];

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {

    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    if (neighborRowIndex >= 0 &&
       neighborRowIndex < numberOfRows &&
       neighborColumnIndex >=0 &&
       neighborColumnIndex < numberOfColumns) {

         if (bombBoard[neighborRowIndex] == 'B' &&
          bombBoard[neighborColumnIndex] == 'B' ||
          bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
           numberOfBombs++;

         };
    };

  });

  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] == 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] =
     getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  };
};

const printBoard = (board) => {
  board.map(func = (row) => {
    console.log(row.join(' | '));
  }).join('\n');

//  const printBoard = board => {
//  console.log(board.map(row => row.join(' | ')).join('\n'));
// };
};

const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);