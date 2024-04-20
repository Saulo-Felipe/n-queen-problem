const n = 40;

/**
 * [
 * [1 0 0 0 0 0 0 0]
 * [0 1 0 0 0 0 0 0]
 * [0 0 0 0 0 0 0 0]
 * [0 0 0 0 0 0 0 0]
 * [0 0 3 0 0 0 0 0]
 * [0 0 0 0 0 0 0 0]
 * [0 0 0 0 0 0 0 0]
 * [0 0 0 0 0 0 0 0]
 * ]
 */


console.time();
const gameBoard = Array.from({ length: n }, () => Array(n).fill(0));


function verifyIfNodeIsValid(l, c) {
  // verificar linha e coluna
  for (let i = 0; i < n; i++) {
    if (gameBoard[l][i] || gameBoard[i][c]) {
      return false
    }
  }

  // top right
  for (let linePos = l, colPos = c; linePos > 0 && colPos < n; linePos--, colPos++) {
    if (gameBoard[linePos][colPos]) {
      return false
    }
  }

  // top left
  for (let linePos = l, colPos = c; linePos >= 0 && colPos >= 0; linePos--, colPos--) {
    if (gameBoard[linePos][colPos]) {
      return false
    }
  }


  return true;
}

function searchNewNode(l, c) {
  if (verifyIfNodeIsValid(l, c)) {
    gameBoard[l][c] = 1;

    if (l < n-1) {
      return searchNewNode(l+1, 0)
    }

    logData(l, c, 1);
    return;
  }


  if (c < n-1) {
    return searchNewNode(l, c+1)
  }

  const nextColPos = gameBoard[l-1].indexOf(1);
  gameBoard[l-1].fill(0);

  if (nextColPos == n-1) {
    const newNextColPos = gameBoard[l-2].indexOf(1);
    gameBoard[l-2].fill(0);
    return searchNewNode(l-2, newNextColPos+1);
  }

  return searchNewNode(l-1, nextColPos+1);
}

searchNewNode(0, 0);
console.timeEnd();



function logData(l, c, time) {
  console.clear();
  for (let i in gameBoard) {
    console.log(JSON.stringify(gameBoard[i]))
  }
}