grafo={
 'A':['B','C'],
 'B':['D','E'],
 'C':['F'],
 'D':[],
 'E':['F'],
 'F':[]
}
# print(grafo['A'])
# saída: ['B','C']

def dfs(grafo,noh):
    # noh: posição inicial
    # grafo: dicionário
    visitado=[]
    fila=[]

    
    visitado.append(noh)
    fila.append(noh)
    
    while fila:
        s=fila.pop()
        print(s)
        for x in grafo[s][::-1]:
            if x not in visitado:
                visitado.append(x)
                fila.append(x)
        print("===> ", visitado)
        
    #return visitado
dfs(grafo,'B')
