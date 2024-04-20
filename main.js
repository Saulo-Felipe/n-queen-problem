const n = 8;

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

  // bottom right
  // for (let linePos = l, colPos = c; linePos < n && colPos < n; linePos++, colPos++) {
  //   if (gameBoard[linePos][colPos]) {
  //     return false
  //   }
  // }

  // top left
  for (let linePos = l, colPos = c; linePos >= 0 && colPos >= 0; linePos--, colPos--) {
    if (gameBoard[linePos][colPos]) {
      return false
    }
  }
  

  return true;
}

// parei aqui: o que fazer quando nao tiver mais caminhos?


async function searchNewNode(l, c) {
  if (verifyIfNodeIsValid(l, c)) {
    gameBoard[l][c] = 1;
  }

  logData();
  await new Promise(resolve => setTimeout(resolve, 200));

  if (c < n-1) {
    return searchNewNode(l, c + 1);
  }

  if (l < n-1) {
    return searchNewNode(l + 1, 0);
  }

  return;
}

searchNewNode(0, 0);





function logData(l, c) {
  console.clear();
  let copyGameData = [...gameBoard];
  // copyGameData[l][c] = "*";

  let viewData = JSON.stringify(copyGameData).replaceAll("],[", "],\n[").replaceAll(",", ", ").replaceAll("] ,", "]");

  console.log(viewData.slice(1, viewData.length-1));
}