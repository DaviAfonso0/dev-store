import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as servico from "../Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as servico_js from "../../Servico/produtosService";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';

function BuscaProduto({setProdutoComprar,setCarrinhoAberto,setProdutoFavoritar}) {
  const [produto, setProduto] = useState([]);
  const [erro, setErro] = useState("");
  const [searchParams] = useSearchParams();
  const [mensagemCarrinho,setMensagemCarrinho] = useState("");
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState(null);
  const [ordenar,setOrdenar] = useState("")

  const produtoBusca = searchParams.get("q") || "";

  useEffect(() => {
      if (!mensagemCarrinho) return;
  
      const temporizador = setTimeout(() => {
        setMensagemCarrinho("");
      }, 3000);
  
      return () => {
        clearTimeout(temporizador);
      };
    }, [mensagemCarrinho]);

  useEffect(() => {
    async function buscaProduto() {
      try {
        const resposta = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(produtoBusca)}`,
        );

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        setProduto(
          dados.products.map((p) => ({
          id:p.id,
          img: p.thumbnail,
          titulo: p.title,
          preco: p.price,
          categoria:servico_js.definirCategoria(p),
          quantidadeSelecionada: 0,
          descricao: p.description,
          estoque:p.stock,
          nota: p.rating
          })),
        );


      } catch (erro) {
        console.log(erro);

        setErro(
          "Não foi possível carregar os produtos. Tente novamente em instantes.",
        );
      }
    }

    if (produtoBusca) {
      buscaProduto();
    }
  }, [produtoBusca]);

  const produtosFiltrados = produto.filter(
    (p) => p.categoria !== "Outros",
  );

  const produtoSelecionado = produto.find(
    (p) => p.id === produtoSelecionadoId,
  );

  let produtosAvaliacao = produtosFiltrados
  if (ordenar === "menor-preco"){
    produtosAvaliacao = [...produtosFiltrados].sort((a,b) => a.preco - b.preco)
  } else if(ordenar === 'maior-preco'){
    produtosAvaliacao = [...produtosFiltrados].sort((a,b) => b.preco - a.preco)
  } else if (ordenar === 'maior-avaliacao'){
    produtosAvaliacao = [...produtosFiltrados].sort((a,b) => b.nota - a.nota)
  } else if (ordenar === "menor-avaliacao"){
      produtosAvaliacao = [...produtosFiltrados].sort((a,b) => a.nota - b.nota)
  }

  return (
    <section>
      {erro && (
        <h2 className="mt-5 text-center text-2xl font-bold text-white">
          {erro}
        </h2>
      )}

      {produtosFiltrados.length === 0 && !erro && (
        <h2 className="mt-10 text-center text-2xl font-bold text-white">
          {produto.length === 0
            ? "Nenhum produto encontrado para essa busca."
            : "Esse produto não está disponível em nossa loja."}
        </h2>
      )}
      <section className="mt-10">
        {produtosFiltrados.length > 0 && (
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <p className="text-cobre-claro/80">
              {produtosFiltrados.length} produtos
            </p>
            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
              className="border bg-fundo-card border-cobre/50 rounded-lg p-1 text-white mr-2 outline-none focus:outline-none focus:border-cobre"
            >
              <option value="" disabled>
                Ordenar Por
              </option>
              <option value="menor-preco">Menor Preço</option>
              <option value="maior-preco">Maior Preço</option>
              <option value="maior-avaliacao">Maior Avaliação</option>
              <option value="menor-avaliacao">Menor Avaliação</option>
            </select>
          </div>
        )}
      </section>

      {produtosFiltrados.length > 0 && (
        <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-10 text-white md:justify-start">
          {produtosAvaliacao.map((p) => (
            <li
              key={p.id}
              onClick={() => setProdutoSelecionadoId(p.id)}
              className="
                flex
                relative
                h-[420px]
                w-[280px]
                cursor-pointer
                flex-col
                rounded-lg
                border
                border-cobre/30
                bg-fundo-card
                p-5
                shadow-lg
                shadow-black/40
                transition-all
                duration-300
                ease-in-out
                lg:hover:-translate-y-1
                lg:hover:border-cobre
                lg:hover:bg-fundo-card-hover
              "
            >
              <div className="absolute top-0 right-0 border border-cobre bg-black/20 p-1 rounded-lg cursor-pointer lg:hover:bg-black/60" onClick={(e) => {
                  e.stopPropagation();
                  servico_js.adicionarFavoritos(p.id,setProdutoFavoritar,p)
                }}>
                  <FavoriteIcon sx={{fontSize: '20px'}}></FavoriteIcon>
              </div>
              <div className="mb-4 rounded-lg bg-black/20 p-4">
                <img
                  src={p.img}
                  alt={p.titulo}
                  className="h-40 w-full object-contain"
                />
              </div>

              <p className="text-sm capitalize text-cobre">{p.categoria}</p>

              <h3 className="mb-3 mt-2 line-clamp-2 font-titulo text-lg font-semibold">
                {p.titulo}
              </h3>

              <div className="mt-auto flex items-center gap-2 text-sm">
                {servico.estrelasNota(p.nota)} {p.nota}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-bold text-cobre">$ {p.preco}</p>

                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-x-1 rounded-lg border border-cobre px-3 py-1 text-cobre transition-all duration-300 ease-in-out hover:bg-cobre hover:text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProdutoComprar((produtosAnteriores) => [...produtosAnteriores,{...p,quantidadeSelecionada: 1,}])
                    setMensagemCarrinho("Adicionado ao Carrinho")
                  
                  }}
                >
                  <AddIcon />
                  Add
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {produtoSelecionado && (
        <div
          onClick={() => setProdutoSelecionadoId(null)}
          className="flex inset-0 justify-center items-center fixed z-[1000] bg-black/60"
        >
          <div
            className="text-white relative flex flex-col gap-3 items-center justify-center bg-fundo-card  w-full max-w-[800px] rounded-lg border border-cobre/40 pb-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-5 right-4">
              <button
                type="button"
                className="text-white cursor-pointer"
                onClick={() => setProdutoSelecionadoId(null)}
              >
                <CloseIcon sx={{ fontSize: "38px" }}></CloseIcon>
              </button>
            </div>
            <div className="mb-6 flex h-[260px] w-full items-center justify-center rounded-lg bg-black/20 p-6">
              <img
                src={produtoSelecionado.img}
                alt={produtoSelecionado.titulo}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="text-cobre capitalize text-sm">
              {produtoSelecionado.categoria}
            </p>
            <h3 className="mt-2 font-semibold text-2xl line-clamp-2 mb-3 font-titulo">
              {produtoSelecionado.titulo}
            </h3>
            <div className="flex items-center gap-2 mt-auto text-sm">
              {servico.estrelasNota(produtoSelecionado.nota)}{" "}
              {produtoSelecionado.nota} de avaliação
            </div>
            <div className="w-xl leading-6">{produtoSelecionado.descricao}</div>
            <div className="flex justify-around w-full">
              <p className="mt-2 text-cobre font-bold text-xl">
                $ {produtoSelecionado.preco}
              </p>
              <div className="flex gap-3 justify-around items-center">
                <div className="flex item-center gap-4 mr-4">
                  <button
                    className="border border-cobre-claro/50 rounded-lg p-[2px] cursor-pointer"
                    onClick={() => {
                      servico_js.diminuirQuantidade(
                        setProduto,
                        produtoSelecionado.id,
                      );
                    }}
                  >
                    <RemoveIcon></RemoveIcon>
                  </button>
                  <p className="text-lg">
                    {produtoSelecionado.quantidadeSelecionada}
                  </p>
                  <button
                    className="border border-cobre-claro/50 rounded-lg p-[2px] cursor-pointer"
                    onClick={() => {
                      servico_js.aumentarQuantidade(
                        setProduto,
                        produtoSelecionado.id,
                      );
                    }}
                  >
                    <AddIcon></AddIcon>
                  </button>
                </div>
                <button
                  className="bg-cobre p-2 rounded-lg text-black cursor-pointer transition-all duration-300 ease-in-out lg:hover:-translate-y-[3px] lg:hover:bg-cobre-claro"
                  onClick={() => {
                                    const quantidadeFinal = produtoSelecionado.quantidadeSelecionada === 0 ? 1 : produtoSelecionado.quantidadeSelecionada;
                                    setProdutoComprar((produtosAnteriores) => [...produtosAnteriores,{...produtoSelecionado,quantidadeSelecionada: quantidadeFinal}]),
                                    setMensagemCarrinho("Adicionado ao Carrinho")
                                    setCarrinhoAberto(true),
                                    setProdutoSelecionadoId(null)
                          }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {mensagemCarrinho && (
              <div className="
                              fixed top-5 right-5 z-[2000]
                              flex w-[300px] items-center gap-2
                              rounded-lg border border-cobre
                              bg-fundo-card px-5 py-3 text-white shadow-lg
                              pointer-events-none
                              max-sm:left-4 max-sm:right-4 max-sm:w-auto
                              animate-[aparecer_.3s_ease-out]
              ">
                <CheckIcon sx={{color: '#6FA287'}}></CheckIcon>
                <p>{mensagemCarrinho}</p>
              </div>
               
            )}
    </section>
  );
}

export default BuscaProduto;