import BuscaProduto from "./Busca_Produto";
import PrimeiraPagina from "./Primeira-Pagina";
import { Routes,Route } from "react-router-dom";

function Principal({setProdutoComprar,setCarrinhoAberto,setProdutoFavoritar,setMensagemCarrinho}) {
  return (
    <main className="px-4 py-5 lg:px-20">
      <Routes>
        <Route path="/" element={<PrimeiraPagina setProdutoComprar={setProdutoComprar} setCarrinhoAberto={setCarrinhoAberto} setProdutoFavoritar={setProdutoFavoritar} setMensagemCarrinho={setMensagemCarrinho} ></PrimeiraPagina> }></Route>
        <Route path="/produtos/busca" element={<BuscaProduto setProdutoComprar={setProdutoComprar}setCarrinhoAberto={setCarrinhoAberto} setProdutoFavoritar={setProdutoFavoritar}></BuscaProduto>}></Route>
      </Routes>
    </main>
  );
}

export default Principal;
