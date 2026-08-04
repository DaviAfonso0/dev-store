import Inicio from "./Inicio"
import Produtos from "./Produtos"

function PrimeiraPagina({setProdutoComprar,setCarrinhoAberto,setProdutoFavoritar,setMensagemCarrinho}){
    return(
        <>
            <Inicio></Inicio>
            <Produtos setProdutoComprar={setProdutoComprar} setCarrinhoAberto={setCarrinhoAberto} setProdutoFavoritar={setProdutoFavoritar} setMensagemCarrinho={setMensagemCarrinho}></Produtos>
        </>
    )
}

export default PrimeiraPagina