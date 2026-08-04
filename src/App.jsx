import { useState,useEffect } from "react"
import "./App.css"
import CheckIcon from '@mui/icons-material/Check';
import Header from "./Componentes/Header/Header"
import Principal from "./Componentes/Main/Principal"
import * as servico from "./Servico/produtosService"

function App(){
  const [produtoComprar,setProdutoComprar] = useState(servico.pegarProdutoCompra())
  const [produtoFavoritar,setProdutoFavoritar] = useState(servico.pegarFavoritos())
  const [carrinhoAberto,setCarrinhoAberto] = useState(false)
  const [mensagemCarrinho, setMensagemCarrinho] = useState("");
  useEffect(() => {
          if (!mensagemCarrinho) return;
      
          const temporizador = setTimeout(() => {
            setMensagemCarrinho("");
          }, 3000);
      
          return () => {
            clearTimeout(temporizador);
          };
        }, [mensagemCarrinho]);
  return(
    <div className="min-h-screen fundo-pagina">
      <Header produtoComprar={produtoComprar} setProdutoComprar={setProdutoComprar} carrinhoAberto={carrinhoAberto} setCarrinhoAberto={setCarrinhoAberto} setMensagemCarrinho={setMensagemCarrinho} produtoFavoritar={produtoFavoritar} setProdutoFavoritar={setProdutoFavoritar} setProdutoComprar={setProdutoComprar}></Header>
      <Principal setProdutoComprar={setProdutoComprar} setCarrinhoAberto={setCarrinhoAberto} setProdutoFavoritar={setProdutoFavoritar} setMensagemCarrinho={setMensagemCarrinho}></Principal>
      {mensagemCarrinho && (
          <div
            className="
                        fixed top-5 right-5 z-[2000]
                        flex w-[300px] items-center gap-2
                        rounded-lg border border-cobre
                        bg-fundo-card px-5 py-3 text-white shadow-lg
                        pointer-events-none
                        max-sm:left-4 max-sm:right-4 max-sm:w-auto
                        animate-[aparecer_.3s_ease-out]
                    "
          >
            <CheckIcon sx={{ color: "#6FA287" }}></CheckIcon>
            <p>{mensagemCarrinho}</p>
          </div>
        )}
    </div>
  )
}

export default App