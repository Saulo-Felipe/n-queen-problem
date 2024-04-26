/** IMPORTANTE:
 * Ler o arquivo README.md
 */
var MainNode = /** @class */ (function () {
    function MainNode(oldData, N, solvedLineIndex) {
        this.data = [];
        this.data = oldData;
        this.N = N;
        this.solvedLineIndex = solvedLineIndex;
    }
    MainNode.prototype.addNewQueen = function (startPos) {
        if (startPos === void 0) { startPos = 0; }
        // Realizar validações e procurar uma nova posição para a queen
        mainLoop: for (var col = startPos || 0; col < this.N; col++) {
            // column validation
            for (var l = 0; l < this.solvedLineIndex; l++) {
                if (this.data[l][col] === 1) {
                    continue mainLoop;
                }
            }
            // top left validation
            for (var l = this.solvedLineIndex, c = col; l >= 0 && c >= 0; l--, c--) {
                if (this.data[l][c] === 1) {
                    continue mainLoop;
                }
            }
            // top right validation
            for (var l = this.solvedLineIndex, c = col; l >= 0 && c <= this.N; l--, c++) {
                if (this.data[l][c] === 1) {
                    continue mainLoop;
                }
            }
            this.data[this.solvedLineIndex][col] = 1; // insere a rainha
            return true;
        }
        return false;
    };
    return MainNode;
}());
function start(N) {
    var stack = [];
    var solvedLineIndex = 0;
    var initialSearchIndex = undefined; // Evita loop infinito, armazenando a posição da coluna da ultima rainha
    var nodeCount = 0;
    // @ts-ignore
    var initialState = Array.from({ length: N }, function () { return Array(N).fill(0); });
    stack.push(new MainNode(initialState, N, solvedLineIndex)); // initial state
    while (solvedLineIndex < N) {
        var newNode = new MainNode(stack[stack.length - 1].data.map(function (row) { return row.slice(); }), N, solvedLineIndex); // copia o estado anterior
        nodeCount++;
        var isAdded = newNode.addNewQueen(initialSearchIndex);
        initialSearchIndex = undefined;
        if (!isAdded) { // se não encontrou uma posição valida, então backtracking
            stack.pop();
            solvedLineIndex--;
            var queenIndex = newNode.data[solvedLineIndex].indexOf(1); // salva a ultima posição da rainha
            initialSearchIndex = queenIndex + 1; // faz com que o proximo loop inicie na coluna da rainha atual +1
            continue;
        }
        // nova linha solucionada
        stack.push(newNode);
        solvedLineIndex++;
        if (solvedLineIndex === N)
            break; // solução encontrada
    }
    return { data: stack[stack.length - 1], nodeCount: nodeCount };
}
// Log das soluções e da tabela (é necessário aguardar a execução total do for para visualizar a tabela)
var loopInicial = 4; // >= 4 // alterar variavel para testes
var loopFinal = 20; // <= 64 // alterar variavel para testes
var table = [];
for (var i = loopInicial; i < loopFinal; i++) {
    var time = performance.now();
    var _a = start(i), nodeCount = _a.nodeCount, data = _a.data;
    var timeEnd = performance.now();
    console.log("\nSolução para N =", i);
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
