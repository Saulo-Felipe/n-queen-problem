# Importante:
-> Além da versão padrão que pode ser executada pelo terminal "nqueen.compilado.js", também existe uma versão web,
onde é possível ter uma melhor visualização da solução (abrir o index.html no navegador).

-> A solução está escrita em TypeScript (nqueen.ts), porém, ja disponibilizamos uma versão compilada (nqueen.compilado.js) 
para facilitar sua execução com nodejs


1. Qual o valor máximo de n que seu algoritmo consegue resolver o problema em 1000 execuções?
N = 13

2. Qual busca é mais apropriada para o caso geral de n?
Para o problema das N-rainhas, uma busca informada como o Algoritmo A* é geralmente preferível devido à sua capacidade de encontrar rapidamente uma ótima solução. Por exemplo, ele utiliza heurísticas para orientar a busca em direção à solução desejada, enquanto os outros algoritmos são mais adequados para problemas de otimização global e podem não ser tão eficazes para encontrar uma solução precisa e rápida para o problema das N-rainhas.

3. Dados de algumas execuções locais:

N = 5
Tempo: 1.719ms
Total de iterações:  5
----------------------------
N = 6
Tempo: 0.667ms
Total de iterações:  56
----------------------------
N = 7
Tempo: 0.317ms
Total de iterações:  11
----------------------------
N = 8
Tempo: 1.461ms
Total de iterações:  218
----------------------------
N = 9
Tempo: 0.747ms
Total de iterações:  73
----------------------------
N = 10
Tempo: 2.742ms
Total de iterações:  194
----------------------------
N = 11
Tempo: 0.92ms
Total de iterações:  93
----------------------------
N = 12
Tempo: 2.77ms
Total de iterações:  510
----------------------------
N = 13
Tempo: 3.174ms
Total de iterações:  209
----------------------------
N = 14
Tempo: 10.33ms
Total de iterações:  3784
----------------------------
N = 15
Tempo: 12.21ms
Total de iterações:  2703
----------------------------
N = 16
Tempo: 61.749ms
Total de iterações:  20088
----------------------------
N = 17
Tempo: 33.575ms
Total de iterações:  10731
----------------------------
N = 18
Tempo: 192.274ms
Total de iterações:  82580
----------------------------
N = 19
Tempo: 14.309ms
Total de iterações:  5071
----------------------------
N = 20
Tempo: 1.108s
Total de iterações:  399250
----------------------------
N = 21
Tempo: 54.621ms
Total de iterações:  17103
----------------------------
N = 22
Tempo: 10.033s
Total de iterações:  3474354
----------------------------
N = 23
Tempo: 156.289ms
Total de iterações:  50833
----------------------------
N = 24
Tempo: 2.782s
Total de iterações:  823192
----------------------------
N = 25
Tempo: 350.845ms
Total de iterações:  97341
----------------------------
N = 26
Tempo: 3.036s
Total de iterações:  795372
----------------------------
N = 27
Tempo: 3.657s
Total de iterações:  908399
----------------------------
N = 28
Tempo: 26.936s
Total de iterações:  6012568
----------------------------
N = 29
Tempo: 16.350s
Total de iterações:  3064449
----------------------------
N = 30
Tempo: 10:18.616 (m:ss.mmm)
Total de iterações:  112859208
----------------------------
N = 31
Tempo: 2:27.510 (m:ss.mmm)
Total de iterações:  26372469
----------------------------
N = 32
Tempo: 20:44.461 (m:ss.mmm)
Total de iterações:  174982818
----------------------------
N = 33
Tempo: 33:34.468 (m:ss.mmm)
Total de iterações:  279913239
----------------------------