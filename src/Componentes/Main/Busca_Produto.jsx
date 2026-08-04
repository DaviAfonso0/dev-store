import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";

import * as servico from "../Rating";
import * as servico_js from "../../Servico/produtosService";

function BuscaProduto({
  setProdutoComprar,
  setCarrinhoAberto,
  setProdutoFavoritar,
}) {
  const [produto, setProduto] = useState([]);
  const [erro, setErro] = useState("");
  const [searchParams] = useSearchParams();
  const [mensagemCarrinho, setMensagemCarrinho] = useState("");
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState(null);
  const [ordenar, setOrdenar] = useState("");

  const produtoBusca = searchParams.get("q") || "";

  const produtoSelecionado = produto.find(
    (p) => p.id === produtoSelecionadoId,
  );

  // Remove a mensagem depois de 3 segundos
  useEffect(() => {
    if (!mensagemCarrinho) return;

    const temporizador = setTimeout(() => {
      setMensagemCarrinho("");
    }, 3000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [mensagemCarrinho]);

  // Trava a rolagem da página quando o overlay estiver aberto
  useEffect(() => {
    if (produtoSelecionadoId === null) return;

    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, [produtoSelecionadoId]);

  // Busca os produtos
  useEffect(() => {
    async function buscaProduto() {
      try {
        setErro("");

        const resposta = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            produtoBusca,
          )}`,
        );

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        setProduto(
          dados.products.map((p) => ({
            id: p.id,
            img: p.thumbnail,
            titulo: p.title,
            preco: p.price,
            categoria: servico_js.definirCategoria(p),
            quantidadeSelecionada: 0,
            descricao: p.description,
            estoque: p.stock,
            nota: p.rating,
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

  let produtosAvaliacao = produtosFiltrados;

  if (ordenar === "menor-preco") {
    produtosAvaliacao = [...produtosFiltrados].sort(
      (a, b) => a.preco - b.preco,
    );
  } else if (ordenar === "maior-preco") {
    produtosAvaliacao = [...produtosFiltrados].sort(
      (a, b) => b.preco - a.preco,
    );
  } else if (ordenar === "maior-avaliacao") {
    produtosAvaliacao = [...produtosFiltrados].sort(
      (a, b) => b.nota - a.nota,
    );
  } else if (ordenar === "menor-avaliacao") {
    produtosAvaliacao = [...produtosFiltrados].sort(
      (a, b) => a.nota - b.nota,
    );
  }

  return (
    <section>
      {/* Mensagem de erro */}
      {erro && (
        <h2 className="mt-5 text-center text-2xl font-bold text-white">
          {erro}
        </h2>
      )}

      {/* Nenhum produto */}
      {produtosFiltrados.length === 0 && !erro && (
        <h2 className="mt-10 text-center text-2xl font-bold text-white">
          {produto.length === 0
            ? "Nenhum produto encontrado para essa busca."
            : "Esse produto não está disponível em nossa loja."}
        </h2>
      )}

      {/* Quantidade e ordenação */}
      <section className="mt-10">
        {produtosFiltrados.length > 0 && (
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
            <p className="text-cobre-claro/80">
              {produtosFiltrados.length} produtos
            </p>

            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
              className="
                mr-2
                rounded-lg
                border
                border-cobre/50
                bg-fundo-card
                p-1
                text-white
                outline-none
                focus:border-cobre
                focus:outline-none
              "
            >
              <option value="" disabled>
                Ordenar Por
              </option>

              <option value="menor-preco">
                Menor Preço
              </option>

              <option value="maior-preco">
                Maior Preço
              </option>

              <option value="maior-avaliacao">
                Maior Avaliação
              </option>

              <option value="menor-avaliacao">
                Menor Avaliação
              </option>
            </select>
          </div>
        )}
      </section>

      {/* Lista de produtos */}
      {produtosFiltrados.length > 0 && (
        <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-10 text-white md:justify-start">
          {produtosAvaliacao.map((p) => (
            <li
              key={p.id}
              onClick={() => setProdutoSelecionadoId(p.id)}
              className="
                relative
                flex
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
              {/* Favoritar */}
              <button
                type="button"
                aria-label="Adicionar aos favoritos"
                className="
                  absolute
                  top-0
                  right-0
                  z-20
                  cursor-pointer
                  rounded-lg
                  border
                  border-cobre
                  bg-black/20
                  p-1
                  lg:hover:bg-black/60
                "
                onClick={(e) => {
                  e.stopPropagation();

                  servico_js.adicionarFavoritos(
                    p.id,
                    setProdutoFavoritar,
                    p,
                  );
                }}
              >
                <FavoriteIcon sx={{ fontSize: "20px" }} />
              </button>

              {/* Imagem */}
              <div className="mb-4 rounded-lg bg-black/20 p-4">
                <img
                  src={p.img}
                  alt={p.titulo}
                  className="h-40 w-full object-contain"
                />
              </div>

              {/* Categoria */}
              <p className="text-sm capitalize text-cobre">
                {p.categoria}
              </p>

              {/* Título */}
              <h3 className="mt-2 mb-3 line-clamp-2 font-titulo text-lg font-semibold">
                {p.titulo}
              </h3>

              {/* Avaliação */}
              <div className="mt-auto flex items-center gap-2 text-sm">
                {servico.estrelasNota(p.nota)}

                <span>{p.nota}</span>
              </div>

              {/* Preço e adicionar */}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-bold text-cobre">
                  $ {p.preco}
                </p>

                <button
                  type="button"
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-x-1
                    rounded-lg
                    border
                    border-cobre
                    px-3
                    py-1
                    text-cobre
                    transition-all
                    duration-300
                    ease-in-out
                    hover:bg-cobre
                    hover:text-black
                  "
                  onClick={(e) => {
                    e.stopPropagation();

                    setProdutoComprar((produtosAnteriores) => [
                      ...produtosAnteriores,
                      {
                        ...p,
                        quantidadeSelecionada: 1,
                      },
                    ]);

                    setMensagemCarrinho(
                      "Adicionado ao Carrinho",
                    );
                  }}
                >
                  <AddIcon />

                  <span>Add</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Overlay do produto */}
      {produtoSelecionado && (
        <div
          onClick={() => setProdutoSelecionadoId(null)}
          className="
            fixed
            inset-0
            z-[1000]
            flex
            items-stretch
            justify-center
            bg-black/70

            sm:items-center
            sm:p-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              flex
              h-dvh
              w-full
              flex-col
              overflow-y-auto
              bg-fundo-card
              text-white

              sm:h-auto
              sm:max-h-[calc(100dvh-2rem)]
              sm:max-w-[800px]
              sm:rounded-lg
              sm:border
              sm:border-cobre/40
            "
          >
            {/* Botão de fechar */}
            <button
              type="button"
              aria-label="Fechar detalhes do produto"
              onClick={() => setProdutoSelecionadoId(null)}
              className="
                absolute
                top-3
                right-3
                z-20
                flex
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-black/50
                p-1
                text-white
                transition-colors
                hover:bg-black/80

                sm:top-4
                sm:right-4
              "
            >
              <CloseIcon sx={{ fontSize: "34px" }} />
            </button>

            {/* Imagem do produto */}
            <div
              className="
                flex
                h-[230px]
                w-full
                shrink-0
                items-center
                justify-center
                bg-black/20
                p-5

                sm:h-[280px]
                sm:rounded-t-lg
                sm:p-7
              "
            >
              <img
                src={produtoSelecionado.img}
                alt={produtoSelecionado.titulo}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Informações do produto */}
            <div
              className="
                flex
                flex-1
                flex-col
                gap-3
                px-5
                py-6
                font-dados

                sm:px-8
                sm:py-7
              "
            >
              <p className="text-sm capitalize text-cobre">
                {produtoSelecionado.categoria}
              </p>

              <h3 className="font-titulo text-xl leading-snug font-semibold sm:text-2xl">
                {produtoSelecionado.titulo}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                {servico.estrelasNota(
                  produtoSelecionado.nota,
                )}

                <span>
                  {produtoSelecionado.nota} de avaliação
                </span>
              </div>

              <p className="w-full text-sm leading-6 text-white/80 sm:text-base">
                {produtoSelecionado.descricao}
              </p>

              {/* Preço e ações */}
              <div
                className="
                  mt-auto
                  flex
                  flex-col
                  gap-5
                  border-t
                  border-cobre/20
                  pt-5

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p className="text-2xl font-bold text-cobre">
                  $ {produtoSelecionado.preco}
                </p>

                <div
                  className="
                    flex
                    w-full
                    flex-col
                    gap-4

                    min-[420px]:flex-row
                    min-[420px]:items-center
                    min-[420px]:justify-between

                    sm:w-auto
                  "
                >
                  {/* Quantidade */}
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-5
                      rounded-lg
                      border
                      border-cobre-claro/30
                      px-3
                      py-2
                    "
                  >
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      className="
                        flex
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-cobre-claro/50
                        p-1
                        transition-colors
                        hover:bg-white/10
                      "
                      onClick={() => {
                        servico_js.diminuirQuantidade(
                          setProduto,
                          produtoSelecionado.id,
                        );
                      }}
                    >
                      <RemoveIcon />
                    </button>

                    <p className="min-w-5 text-center text-lg">
                      {
                        produtoSelecionado.quantidadeSelecionada
                      }
                    </p>

                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      className="
                        flex
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-cobre-claro/50
                        p-1
                        transition-colors
                        hover:bg-white/10
                      "
                      onClick={() => {
                        servico_js.aumentarQuantidade(
                          setProduto,
                          produtoSelecionado.id,
                        );
                      }}
                    >
                      <AddIcon />
                    </button>
                  </div>

                  {/* Comprar */}
                  <button
                    type="button"
                    className="
                      w-full
                      cursor-pointer
                      rounded-lg
                      bg-cobre
                      px-6
                      py-3
                      font-semibold
                      text-black
                      transition-all
                      duration-300
                      hover:bg-cobre-claro

                      min-[420px]:w-auto
                      lg:hover:-translate-y-[3px]
                    "
                    onClick={() => {
                      const quantidadeFinal =
                        produtoSelecionado.quantidadeSelecionada ===
                        0
                          ? 1
                          : produtoSelecionado.quantidadeSelecionada;

                      setProdutoComprar(
                        (produtosAnteriores) => [
                          ...produtosAnteriores,
                          {
                            ...produtoSelecionado,
                            quantidadeSelecionada:
                              quantidadeFinal,
                          },
                        ],
                      );

                      setMensagemCarrinho(
                        "Adicionado ao Carrinho",
                      );

                      setCarrinhoAberto(true);
                      setProdutoSelecionadoId(null);
                    }}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {mensagemCarrinho && (
        <div
          className="
            pointer-events-none
            fixed
            top-5
            right-5
            z-[2000]
            flex
            w-[300px]
            items-center
            gap-2
            rounded-lg
            border
            border-cobre
            bg-fundo-card
            px-5
            py-3
            text-white
            shadow-lg
            animate-[aparecer_.3s_ease-out]

            max-sm:right-4
            max-sm:left-4
            max-sm:w-auto
          "
        >
          <CheckIcon sx={{ color: "#6FA287" }} />

          <p>{mensagemCarrinho}</p>
        </div>
      )}
    </section>
  );
}

export default BuscaProduto;