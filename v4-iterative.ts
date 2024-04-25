console.time();

const nQueen = 40;
const stack: MainNode[] = [];
let isSolved = false;
let solvedLineIndex = 0;
let initialSearchIndex: number | undefined = undefined;

class MainNode {
  data: number[][] = [];

  constructor(oldData: number[][]) {
    this.data = oldData;
  }

  addNewQueen(startPos: number = 0) {
    mainLoop:
    for (let col = startPos || 0; col < nQueen; col++) {
      // column
      for (let l = 0; l < solvedLineIndex; l++) {
        if (this.data[l][col] === 1) {
          continue mainLoop;
        }
      }

      // top left;
      for (let l = solvedLineIndex, c = col; l >= 0 && c >= 0; l--, c--) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      // top right;
      for (let l = solvedLineIndex, c = col; l >= 0 && c <= nQueen; l--, c++) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      this.data[solvedLineIndex][col] = 1;
      return true;
    }

    return false;
  }
}

async function start() {
  stack.push(new MainNode(Array.from({ length: nQueen }, () => Array(nQueen).fill(0)))); // initial state

  let i = 0;
  while (solvedLineIndex < nQueen) {
    i++;
    // console.clear();

    const newNode = new MainNode(stack[stack.length-1].data.map(row => row.slice()));
    const isAdded = newNode.addNewQueen(initialSearchIndex);

    // console.log("initialSearchIndex: ", initialSearchIndex);
    // console.log("nQueen: ", nQueen);
    // console.log("solvedLineIndex: ", solvedLineIndex);
    // logData(stack[stack.length-1]);

    initialSearchIndex = undefined;


    // await new Promise(resolve => setTimeout(resolve, 1000));
    if (!isAdded) { // backtracking
      stack.pop();
      solvedLineIndex--;

      const queenIndex = newNode.data[solvedLineIndex].indexOf(1);
      initialSearchIndex = queenIndex+1;
      continue;
    }

    stack.push(newNode);
    solvedLineIndex++;

    if (solvedLineIndex === nQueen) {
      // console.log("SOLVED!");
      // console.log("LOOP TOTAL: ", i);
      // logData(stack[stack.length-1])
      console.log("N = ", nQueen);
      break;
    }
  }
}

start();

// logStack()


function logStack() {
  for (let element of stack) {
    console.log("+------------------------+")
    for (let d of element.data) {
      console.log(JSON.stringify(d))
    }
  }
}

function logData(node: MainNode) {
  for (let i = 0; i < node.data.length; i++) {
    console.log(JSON.stringify(node.data[i].map(e => e === 1 ? 1 : 0)));
  }
  console.log("--------------------")
}
console.timeEnd();