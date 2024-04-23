const nQueen: number = 6;


class TreeNode {
  data: number[][] = Array.from({ length: nQueen }, () => Array(nQueen).fill(0));
  previousNode: TreeNode | null;
  childNodeCount = 0;

  constructor(previousNode: TreeNode | null) {
    this.previousNode = previousNode;
    this.data = this.previousNode?.data || this.data;

    if (this.insertNewQueen(this.childNodeCount)) {
      this.childNodeCount++;
      new TreeNode(this);
      logData(this.data);
    } else {
      console.log(this);
    }
  }

  public insertNewQueen(childPos: number): boolean {
    let linePos: number | null = null;

    for (let l in this.data) { // encontra a linha que ainda nao tem rainha
      if (!this.data[l].includes(1)) {
        linePos = Number(l);
        break;
      }
    }

    if (linePos === null) return false;

    mainLoop:
    for (let columnPos = 0; columnPos < nQueen; columnPos++) {
      // column
      for (let l = 0; l < linePos; l++) {
        if (this.data[l][columnPos] === 1) {
          continue mainLoop;
        }
      }

      // top left;
      for (let l = linePos, c = columnPos; l >= 0 && c >= 0; l--, c--) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      // top right;
      for (let l = linePos, c = columnPos; l >= 0 && c <= nQueen; l--, c++) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      // is valid position
      this.data[linePos][columnPos] = 1;
      return true;
    }

    return false;
  }

  public backtracking() {
    if (this.childNodeCount < nQueen) {
      new TreeNode(this);
    }

    return this.previousNode?.backtracking();
  }
}

const tree = new TreeNode(null);


function logData(data: number[][]) {
  console.log("\n---------------] Result [------------------");
  for (let i of data) {
    console.log(JSON.stringify(i));
  }
}