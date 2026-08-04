import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Botao from "../Main/Botao";
import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Carrinho from "./CarrinhoCompra/Carrinho";
import Favoritos from "./Favoritar/Favoritos";


function Header({produtoComprar,setProdutoComprar,carrinhoAberto,setCarrinhoAberto,setMensagemCarrinho,produtoFavoritar,setProdutoFavoritar}) {
  const[nomeProduto,setNomeProduto] = useState("")
  const [overlayFavoritos,setOverlayFavoritos] = useState(false)
  const navigate = useNavigate()

  function enviarForm(e){
    e.preventDefault();
    const nomeFormatado = nomeProduto.trim()
    if(!nomeFormatado){
      alert("Campo Vazio!")
      return
    } 
    navigate(`/produtos/busca?q=${encodeURIComponent(nomeFormatado)}`)
  }
  
  return (
    <header
      className="
        bg-fundo-pagina
        border-b
        border-cobre-claro
        grid
        grid-cols-2
        gap-4
        p-4
        md:grid-cols-[auto_1fr_auto]
        md:items-center
        md:p-6
        lg:p-8
      "
    >
      {/* Logo */}
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <h1 className="text-white text-2xl font-titulo font-bold">
            DevStore
          </h1>
          <p className="text-cobre text-2xl">
            {"</>"}
          </p>
        </div>
      </Link>

      {/* Ícones */}
      <div className="justify-self-end flex gap-5 text-white md:order-3">
        <div className="relative">
          <Botao onClick={()=> setOverlayFavoritos(!overlayFavoritos)}><FavoriteIcon></FavoriteIcon></Botao>
          {overlayFavoritos && (
            <Favoritos produtoFavoritar={produtoFavoritar} setOverlayFavoritos={setOverlayFavoritos} setProdutoFavoritar={setProdutoFavoritar} setProdutoComprar={setProdutoComprar}></Favoritos>
          )}
           <p className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-cobre px-1 text-xs font-bold text-black">
              {produtoFavoritar.length}
          </p>
        </div>
        <div className="relative">
          <Botao onClick={() => setCarrinhoAberto(!carrinhoAberto)}><ShoppingCartIcon></ShoppingCartIcon></Botao>
          <p className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-cobre px-1 text-xs font-bold text-black">
              {produtoComprar.length}
          </p>
        </div>
          {carrinhoAberto && (
            <Carrinho setProdutoComprar={setProdutoComprar} setCarrinhoAberto={setCarrinhoAberto} produtoComprar={produtoComprar} setMensagemCarrinho={setMensagemCarrinho}></Carrinho>
          )}
      </div>
  
      {/* Busca */}
      <form
        onSubmit={enviarForm}
        className="
          relative
          col-span-2

          transition-all duration-200

          focus-within:border-[#D9A35F]
          focus-within:ring-1
          focus-within:ring-[#D9A35F]

          md:col-span-1
          md:justify-self-center

          flex
          items-center
          gap-3

          w-full
          max-w-[600px]

          border
          border-cobre
          rounded-xl

          py-3
          px-4
        "
      >
        <SearchIcon className="text-cobre absolute left-4 top-[11px]" />

        <input
          type="search"
          value={nomeProduto}
          placeholder="Buscar Produto..."
          onChange={(e) => setNomeProduto(e.target.value)}
          className="
            flex-1
            min-w-0
            bg-transparent
            outline-none
            text-white
            text-[16px]
            placeholder:font-bold
            placeholder:text-[#7E9189]
            pl-6
            
          "
        />

        <button
          type="submit"
          className="cursor-pointer border-l border-cobre pl-3"
        >
          <SearchIcon className="text-cobre" />
        </button>
      </form>
    </header>
  );
}

export default Header;