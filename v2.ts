const nQueen: number = 6;


class TreeNode {
  data: number[][] = Array.from({ length: nQueen }, () => Array(nQueen).fill(0));
  previousNode: TreeNode | null;
  childNodeCount = 0;

  constructor(previousNode: TreeNode | null) {
    this.previousNode = previousNode;
    this.data = this.previousNode?.data || this.data;

    this.insertNewQueen();
  }

  public insertNewQueen(isFromBacktracking?: boolean) {
    if (this.validateNewQueenPosition(isFromBacktracking ? this.clearLineAndSearchQueen() : undefined)) {
      this.childNodeCount++;
      new TreeNode(this);
    } else {
      console.log("back")
      logData(this.data, "\n");
      this.backtracking();
    }
  }

  public backtracking() {
    console.log("anterior: ", this?.previousNode?.previousNode?.data)
    console.log("anterior2: ", this?.previousNode?.data)
    this.previousNode?.insertNewQueen(true);
  }

  public validateNewQueenPosition(defaultColumn?: number): boolean {
    let linePos: number | null = this.searchLastLinePos();

    if (linePos === null) return false;

    mainLoop:
    for (let columnPos = defaultColumn ? defaultColumn : 0; columnPos < nQueen; columnPos++) {
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

  private clearLineAndSearchQueen() {
    const theLastLine = this.searchLastLinePos();
    console.log("last: ", theLastLine)

    if (theLastLine !== null) {
      const queenPosition = this.data[theLastLine-1].indexOf(1) + 1;
      this.data[theLastLine].fill(0);
      console.log("limpei: ", queenPosition)

      return queenPosition;
    }
  }

  private searchLastLinePos() {
    for (let l in this.data) { // encontra a linha que ainda nao tem rainha
      if (!this.data[l].includes(1)) {
        return Number(l);
      }
    }

    return null
  }
}

const tree = new TreeNode(null);


function logData(data: number[][], concat?: string) {
  for (let i of data) {
    console.log(JSON.stringify(i));
  }
  console.log(concat)
}