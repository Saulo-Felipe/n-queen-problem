/** IMPORTANTE:
 * LER O ARQUIVO README.md
 */

class MainNode {
  data: number[][] = [];
  N: number;
  solvedLineIndex: number;

  constructor(oldData: number[][], N: number, solvedLineIndex: number) {
    this.data = oldData;
    this.N = N;
    this.solvedLineIndex = solvedLineIndex;
  }

  addNewQueen(startPos: number = 0) {
    // Realizar validações e procurar uma nova posição para a queen
    mainLoop:
    for (let col = startPos || 0; col < this.N; col++) {
      // column validation
      for (let l = 0; l < this.solvedLineIndex; l++) {
        if (this.data[l][col] === 1) {
          continue mainLoop;
        }
      }

      // top left validation
      for (let l = this.solvedLineIndex, c = col; l >= 0 && c >= 0; l--, c--) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      // top right validation
      for (let l = this.solvedLineIndex, c = col; l >= 0 && c <= this.N; l--, c++) {
        if (this.data[l][c] === 1) {
          continue mainLoop;
        }
      }

      this.data[this.solvedLineIndex][col] = 1; // insere a rainha
      return true;
    }

    return false;
  }
}

function start(N: number) {
  const stack: MainNode[] = [];
  let solvedLineIndex = 0;
  let initialSearchIndex: number | undefined = undefined; // Evita loop infinito, armazenando a posição da coluna da ultima rainha
  let nodeCount = 0;

  // @ts-ignore
  const initialState = Array.from({ length: N }, () => Array(N).fill(0));
  stack.push(new MainNode(initialState, N, solvedLineIndex)); // initial state

  while (solvedLineIndex < N) {
    const newNode = new MainNode(stack[stack.length-1].data.map(row => row.slice()), N, solvedLineIndex); // copia o estado anterior
    nodeCount++;
    const isAdded = newNode.addNewQueen(initialSearchIndex);

    initialSearchIndex = undefined;

    if (!isAdded) { // se não encontrou uma posição valida, então backtracking
      stack.pop();
      solvedLineIndex--;

      const queenIndex = newNode.data[solvedLineIndex].indexOf(1); // salva a ultima posição da rainha
      initialSearchIndex = queenIndex+1; // faz com que o proximo loop inicie na coluna da rainha atual +1
      continue;
    }

    // nova linha solucionada
    stack.push(newNode);
    solvedLineIndex++;

    if (solvedLineIndex === N) break; // solução encontrada
  }

  return { data: stack[stack.length-1], nodeCount }
}


// Log das soluções e da tabela (é necessário aguardar a execução total do for para visualizar a tabela)
let loopInicial = 4; // >= 4 // alterar variavel para testes
let loopFinal = 20 // <= 64 // alterar variavel para testes
const table: any[] = [];

for (let i = loopInicial; i < loopFinal; i++) {
  const time = performance.now();

  const { nodeCount, data } = start(i)

  const timeEnd = performance.now();

  console.log("\nSolução para N =", i)
  // @ts-ignore
  console.log(JSON.stringify(data.data).replaceAll("],[", "]\n[").replaceAll("[[", "[").replaceAll("]]", "]"));
  table.push({
    "Iteração": i,
    "Solução encontrada": "Sim",
    "N. de nós": nodeCount,
    "Tempo de processamento (segundos)": Number((timeEnd - time).toFixed(2))
  });
}

console.table(table);

/** IMPORTANTE:
 * LER O ARQUIVO README.md
 */