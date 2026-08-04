import Botao from "../Main/Botao";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LaptopIcon from "@mui/icons-material/Laptop";
import UsbIcon from "@mui/icons-material/Usb";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import * as servico from "../Rating";
import * as servico_js from "../../Servico/produtosService";

function Produtos({
  setCarrinhoAberto,
  setProdutoComprar,
  setProdutoFavoritar,
  setMensagemCarrinho,
}) {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [erro, setErro] = useState("");
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState(null);
  const produtoSelecionado = produtos.find(
    (produto) => produto.id === produtoSelecionadoId,
  );
  const [ordenar, setOrdenar] = useState("");

  useEffect(() => {
    if (produtoSelecionadoId === null) return;

    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, [produtoSelecionadoId]);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch("https://dummyjson.com/products?limit=0");
        const dados = await resposta.json();

        setProdutos(
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
            favorito: false,
          })),
        );
      } catch (erro) {
        console.log(erro);
        setErro(
          "Não foi possível carregar os produtos. Tente novamente em instantes.",
        );
      }
    }
    buscarProdutos();
  }, []);

  const produtosEletronicos = produtos.filter(
    (produto) => produto.categoria !== "Outros",
  );
  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtosEletronicos
      : produtosEletronicos.filter(
          (produto) => produto.categoria === categoriaSelecionada,
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
    produtosAvaliacao = [...produtosFiltrados].sort((a, b) => b.nota - a.nota);
  } else if (ordenar === "menor-avaliacao") {
    produtosAvaliacao = [...produtosFiltrados].sort((a, b) => a.nota - b.nota);
  }

  return (
    <section className="mt-6 scroll-mt-7" id="categorias">
      <section>
        <section>
          <h3 className="text-cobre text-[17px] text-center md:text-left">
            Categorias
          </h3>
          <div className="text-cobre-claro font-dados flex flex-wrap gap-y-3 gap-x-4 justify-center items-center md:justify-start md:items-start mt-2">
            <Botao
              className="min-w-[130px] py-2.5 px-5 flex flex-col items-center gap-1"
              onClick={() => setCategoriaSelecionada("Todos")}
            >
              <WidgetsOutlinedIcon></WidgetsOutlinedIcon>
              <p>Todos</p>
            </Botao>
            <Botao
              className="min-w-[130px] py-2.5 px-5 flex flex-col items-center gap-1"
              onClick={() => setCategoriaSelecionada("Celulares")}
            >
              <SmartphoneIcon></SmartphoneIcon>
              <p>Celulares</p>
            </Botao>
            <Botao
              className="min-w-[130px] py-2.5 px-5 flex flex-col items-center gap-1"
              onClick={() => setCategoriaSelecionada("Notebooks")}
            >
              <LaptopIcon></LaptopIcon>
              <p>Notebooks</p>
            </Botao>
            <Botao
              className="min-w-[130px] py-2.5 px-5 flex flex-col items-center gap-1"
              onClick={() => setCategoriaSelecionada("Acessórios")}
            >
              <UsbIcon></UsbIcon>
              <p>Acessórios</p>
            </Botao>
            <Botao
              className="min-w-[130px] py-2.5 px-5 flex flex-col items-center gap-1"
              onClick={() => setCategoriaSelecionada("Tablets")}
            >
              <KeyboardIcon></KeyboardIcon>
              <p>Tablets</p>
            </Botao>
          </div>
        </section>
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
      </section>
      <section>
        {erro && (
          <h2 className="text-white text-2xl mt-5 text-center font-bold">
            {erro}
          </h2>
        )}
        {produtosFiltrados.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-10 mt-10 text-white md:justify-start">
            {produtosAvaliacao.map((p) => (
              <li
                key={p.id}
                onClick={() => setProdutoSelecionadoId(p.id)}
                className="
                            w-[280px]
                            h-[420px]
                            flex flex-col
                            rounded-lg
                            border border-cobre/30
                            bg-fundo-card
                            p-5
                            cursor-pointer
                            shadow-lg shadow-black/40
                            transition-all
                            duration-300
                            ease-in-out
                            lg:hover:-translate-y-1
                            lg:hover:border-cobre
                            lg:hover:bg-fundo-card-hover
                            relative"
              >
                <button
                  type="button"
                  className="absolute top-0 right-0 border border-cobre bg-black/20 p-1 rounded-lg cursor-pointer lg:hover:bg-black/60"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMensagemCarrinho("Produto Favoritado!");
                    console.log("Clicou no favorito");
                    servico_js.adicionarFavoritos(p.id, setProdutoFavoritar, p);
                  }}
                >
                  <FavoriteIcon sx={{ fontSize: "20px" }}></FavoriteIcon>
                </button>

                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <img
                    src={p.img}
                    alt={p.titulo}
                    className="w-full h-40 object-contain"
                  />
                </div>

                <p className="text-cobre capitalize text-sm">{p.categoria}</p>

                <h3 className="mt-2 font-semibold text-lg line-clamp-2 mb-3 font-titulo">
                  {p.titulo}
                </h3>

                <div className="flex items-center gap-2 mt-auto text-sm">
                  {servico.estrelasNota(p.nota)} {p.nota}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-cobre font-bold text-xl">$ {p.preco}</p>
                  <button
                    className="flex text-cobre gap-x-1 cursor-pointer border border-cobre py-1 px-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-cobre hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      servico_js.adicionarCarrinho(p.id, p, setProdutoComprar);
                      setMensagemCarrinho("Adicionado ao Carrinho");
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
      </section>
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
      overflow-y-auto
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
        min-h-dvh
        w-full
        flex-col
        overflow-y-auto
        bg-fundo-card
        text-white

        sm:min-h-0
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

            {/* Imagem */}
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

            {/* Informações */}
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

              <h3
                className="
            font-titulo
            text-xl
            font-semibold
            leading-snug

            sm:text-2xl
          "
              >
                {produtoSelecionado.titulo}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                {servico.estrelasNota(produtoSelecionado.nota)}

                <span>{produtoSelecionado.nota} de avaliação</span>
              </div>

              <p
                className="
            w-full
            text-sm
            leading-6
            text-white/80

            sm:text-base
          "
              >
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
              sm:justify-end
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
                          setProdutos,
                          produtoSelecionado.id,
                        );
                      }}
                    >
                      <RemoveIcon />
                    </button>

                    <p className="min-w-5 text-center text-lg">
                      {produtoSelecionado.quantidadeSelecionada}
                    </p>

                    <button
                      type="button"
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
                          setProdutos,
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
                      servico_js.adicionarCarrinho(
                        produtoSelecionado.id,
                        produtoSelecionado,
                        setProdutoComprar,
                      );

                      setMensagemCarrinho("Adicionado ao Carrinho");
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
    </section>
  );
}

export default Produtos;
