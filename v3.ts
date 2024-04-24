const nQueen = 30;
const stack: MainNode[] = [];

class MainNode {
  data: number[][] = [];

  constructor(oldData: number[][]) {
    this.data = oldData;
  }

  addNewQueen(initialColPos?: number): { isTheLastLine: boolean, addedQueen: boolean } {
    let linePos = this.searchLastLine();

    mainLoop:
    for (let col = initialColPos || 0; col < nQueen; col++) {
      // column
      for (let l = 0; l < linePos; l++) {
        if (this.data[l][col] === 1) {
          continue mainLoop;
        }
      }

      // top left;
      for (let l = linePos, c = col; l >= 0 && c >= 0; l--, c--) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      // top right;
      for (let l = linePos, c = col; l >= 0 && c <= nQueen; l--, c++) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      this.data[linePos][col] = 1;
      return {
        isTheLastLine: linePos === nQueen - 1,
        addedQueen: true
      }
    }

    return {
      isTheLastLine: linePos === nQueen - 1,
      addedQueen: false
    };
  }

  alterQueenPosition() {
    const lastQueenLine = this.searchLastLine() - 1;
    const currentQueenPos = this.data[lastQueenLine].indexOf(1);
    this.data[lastQueenLine].fill(0);

    if (currentQueenPos === nQueen - 1) { // if not have more column positions in line
      return editLastState();
    }

    const response = this.addNewQueen(currentQueenPos+1);

    if (response.addedQueen && response.isTheLastLine) { // finished and searched solution
      return console.log("Finish!!");
    }
  
    if (!response.addedQueen) { // invalid solution
      return editLastState(); // fazer isso funciona
    }
  
    return generateNewState(JSON.stringify(this.data)); // prevent array reference
  }

  private searchLastLine(): number {
    for (let l = 0; l < this.data.length; l++) { // define line pos
      if (!this.data[l].includes(Number(1))) {
        return l;
      }
    }
    return 0;
  }
}

function generateNewState(dataCopy: string) {
  const newNode = createNode(dataCopy);

  return isValidSolution(newNode)
}

function editLastState() {
  // fazer isso funcionar
  stack.pop();
  return stack[stack.length-1].alterQueenPosition();
}

function isValidSolution(newNode: MainNode) {
  const response = newNode.addNewQueen();

  if (response.addedQueen && response.isTheLastLine) { // finished and searched solution
    return console.log("Finish!!");
  }

  if (!response.addedQueen) { // invalid solution
    return editLastState(); // fazer isso funciona
  }

  // try {
    return generateNewState(JSON.stringify(newNode.data)); // prevent array reference
  // }
  //  catch(e) {
  //   console.log("stack: ", stack.length);
  //  }
}

function createNode(dataCopy: string): MainNode {
  const data = JSON.parse(dataCopy);
  const newNode = new MainNode(data);
  stack.push(newNode);
  return newNode;
}

generateNewState(JSON.stringify(Array.from({ length: nQueen }, () => Array(nQueen).fill(0))))

for (let c = 0; c < nQueen; c++) {
  console.log(JSON.stringify(stack[stack.length-1].data[c]));
}