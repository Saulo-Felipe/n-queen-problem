function start(N) {
    const stack = [];
    let solvedLineIndex = 0;
    let initialSearchIndex = undefined; // Evita loop infinito, armazenando a posição da coluna da ultima rainha
    class MainNode {
        constructor(oldData) {
            this.data = [];
            this.data = oldData;
        }
        addNewQueen(startPos = 0) {
            // Realizar validações e procurar uma nova posição para a queen
            mainLoop: for (let col = startPos || 0; col < N; col++) {
                // column validation
                for (let l = 0; l < solvedLineIndex; l++) {
                    if (this.data[l][col] === 1) {
                        continue mainLoop;
                    }
                }
                // top left validation
                for (let l = solvedLineIndex, c = col; l >= 0 && c >= 0; l--, c--) {
                    if (this.data[l][c] === 1) {
                        continue mainLoop;
                    }
                }
                // top right validation
                for (let l = solvedLineIndex, c = col; l >= 0 && c <= N; l--, c++) {
                    if (this.data[l][c] === 1) {
                        continue mainLoop;
                    }
                }
                this.data[solvedLineIndex][col] = 1; // insere a rainha
                return true;
            }
            return false;
        }
    }
    const initialState = Array.from({ length: N }, () => Array(N).fill(0));
    stack.push(new MainNode(initialState)); // initial state
    while (solvedLineIndex < N) {
        const newNode = new MainNode(stack[stack.length - 1].data.map(row => row.slice())); // copia o estado anterior
        const isAdded = newNode.addNewQueen(initialSearchIndex);
        initialSearchIndex = undefined;
        if (!isAdded) { // se não encontrou uma posição valida, então backtracking
            stack.pop();
            solvedLineIndex--;
            const queenIndex = newNode.data[solvedLineIndex].indexOf(1); // salva a ultima posição da rainha
            initialSearchIndex = queenIndex + 1; // faz com que o proximo loop inicie na coluna da rainha atual +1
            continue;
        }
        // nova linha solucionada
        stack.push(newNode);
        solvedLineIndex++;
        if (solvedLineIndex === N)
            break; // solução encontrada
    }
    return stack[stack.length - 1];
}
console.log(start(4).data);
