export function definirCategoria(produto){
      if (produto.category === "smartphones") {
          return "Celulares";
      }

      if (produto.category === "laptops") {
          return "Notebooks";
      }

      if(produto.category === "tablets"){
        return "Tablets";
      }

      if (produto.category === "mobile-accessories") {
          return "Acessórios";
      }

      return "Outros";
    
}

export function diminuirQuantidade(setProdutos,id){
    setProdutos((produtosAtuais) => produtosAtuais.map((produto)=> {
        if(produto.id === id && produto.quantidadeSelecionada > 0 ){
            return {...produto,quantidadeSelecionada: produto.quantidadeSelecionada - 1};
        }
        return produto
    }))
}

export function aumentarQuantidade(setProdutos,id){
    setProdutos((produtosAtuais) => produtosAtuais.map((produto)=> {
        if(produto.id === id && produto.quantidadeSelecionada < produto.estoque){
            return {...produto,quantidadeSelecionada: produto.quantidadeSelecionada + 1};
        }
        return produto
    }))
}


export function pegarProdutoCompra(){
    return JSON.parse(localStorage.getItem("carrinho") || "[]")
}

export function adicionarCarrinho(id,produto,setProdutoComprar){
    const produtosAntigos = pegarProdutoCompra()
    const produtoExiste = produtosAntigos.some((p) => p.id === id)
    const quantidadeCalcular = produto.quantidadeSelecionada === 0 ? produto.quantidadeSelecionada + 1 : produto.quantidadeSelecionada

    let produtosAtuais 
    if(produtoExiste){
        const produtoAlterado = produtosAntigos.map((p) => {
            if(p.id === produto.id){
                return {...p,quantidadeSelecionada: p.quantidadeSelecionada + quantidadeCalcular}
            }
            return p
        })
        produtosAtuais = produtoAlterado
    } else {
        produtosAtuais = [...produtosAntigos,{...produto,quantidadeSelecionada: quantidadeCalcular}]
    }
    

    setProdutoComprar(produtosAtuais)
    const produtosAtuaisFormatado = JSON.stringify(produtosAtuais)
    localStorage.setItem("carrinho",produtosAtuaisFormatado)
}

export function aumentarItemCarrinho(setProdutos,id){
    const produtosAntigos = pegarProdutoCompra()
    const produtosNovos = produtosAntigos.map((p) =>{
        if(p.id === id && p.quantidadeSelecionada < p.estoque){
           return {...p,quantidadeSelecionada: p.quantidadeSelecionada + 1}
        }
        return p
    })
    setProdutos(produtosNovos)
    const produtosAtuaisFormatados = JSON.stringify(produtosNovos)
    localStorage.setItem("carrinho",produtosAtuaisFormatados)
}

export function diminuirItemsCarrinho(setProdutos,id){
    const produtosAntigos = pegarProdutoCompra();
    const produtosNovos = produtosAntigos.map((p) => {
        if(p.id === id && p.quantidadeSelecionada > 0){
            return {...p,quantidadeSelecionada: p.quantidadeSelecionada - 1}
        }
        return p
    })

    const produtosfiltrados = produtosNovos.filter((p) => p.quantidadeSelecionada > 0)

    setProdutos(produtosfiltrados)
    const produtosAtualizados = JSON.stringify(produtosfiltrados)
    localStorage.setItem("carrinho",produtosAtualizados)
}

export function deletarCarrinho(setProdutoComprar,id){
    const produtosAntigos = pegarProdutoCompra();
    const produtosFiltrados = produtosAntigos.filter((p) => p.id !== id)
    setProdutoComprar(produtosFiltrados)
    const produtosAtualizados = JSON.stringify(produtosFiltrados)
    localStorage.setItem("carrinho",produtosAtualizados)
}

export function pegarFavoritos(){
     return JSON.parse(localStorage.getItem("favoritos") || "[]");
}

export function adicionarFavoritos(id,setFavoritos,produto){
    const produtosAntigos = pegarFavoritos()
    const jaExiste = produtosAntigos.some((p) => p.id === id)

    let produtosAtualizados
    if(jaExiste){
        produtosAtualizados = produtosAntigos.filter((p) => p.id !== id)
    } else{
        produtosAtualizados =  [...produtosAntigos,{...produto,favorito: true}]
    }

    setFavoritos(produtosAtualizados)
    const produtoAtualizadosString = JSON.stringify(produtosAtualizados)
    localStorage.setItem("favoritos",produtoAtualizadosString)

}

