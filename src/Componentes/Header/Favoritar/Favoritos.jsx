import { useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";

import * as servico from "../../Rating";
import * as servico_js from "../../../Servico/produtosService";

function Favoritos({
  produtoFavoritar,
  setOverlayFavoritos,
  setProdutoFavoritar,
  setProdutoComprar,
}) {
  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  return (
    <section
      className="fixed inset-0 z-[1000] flex justify-end bg-black/80"
      onClick={() => setOverlayFavoritos(false)}
    >
      <div
        className="
          flex
          h-dvh
          min-h-0
          w-full
          max-w-[700px]
          flex-col
          overflow-hidden
          border-l
          border-cobre
          bg-fundo-pagina
          text-xl
          text-white
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <section
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-cobre
            p-4
            font-titulo
          "
        >
          <h2>Favoritos</h2>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setOverlayFavoritos(false)}
          >
            <CloseIcon />
          </button>
        </section>

        {/* Área restante do painel */}
        <section className="flex h-0 min-h-0 flex-1 flex-col overflow-hidden">
          {produtoFavoritar.length === 0 ? (
            <section
              className="
                flex
                h-full
                flex-col
                items-center
                justify-start
                gap-y-2
                pt-10
                font-dados
              "
            >
              <p>favoritos_vazio{"()"}</p>

              <p className="text-cobre">
                adicione produtos para continuar
              </p>
            </section>
          ) : (
            /*
              Esta é a parte que possui a rolagem.
              O h-full limita a altura ao espaço restante do painel.
            */
            <section
              className="
                scroll-carrinho
                h-full
                w-full
                overflow-y-scroll
                overscroll-contain
                px-5
                pt-10
                pb-10
                font-dados
                sm:px-10
              "
            >
              <ul
                className="
                  flex
                  w-full
                  flex-wrap
                  justify-center
                  gap-x-8
                  gap-y-10
                  py-2
                "
              >
                {produtoFavoritar.map((p) => (
                  <li
                    key={p.id}
                    className="
                      relative
                      flex
                      h-[420px]
                      w-[280px]
                      shrink-0
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
                    {/* Remover dos favoritos */}
                    <button
                      type="button"
                      aria-label="Remover dos favoritos"
                      className="
                        absolute
                        top-0
                        right-0
                        cursor-pointer
                        rounded-lg
                        border
                        border-cobre
                        bg-black/20
                        p-1
                        transition-colors
                        lg:hover:bg-black/60
                      "
                      onClick={() => {
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
                    <h3
                      className="
                        mt-2
                        mb-3
                        line-clamp-2
                        font-titulo
                        text-lg
                        font-semibold
                      "
                    >
                      {p.titulo}
                    </h3>

                    {/* Avaliação */}
                    <div className="mt-auto flex items-center gap-2 text-sm">
                      {servico.estrelasNota(p.nota)}

                      <span>{p.nota}</span>
                    </div>

                    {/* Preço e botão */}
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
                        onClick={() => {
                          servico_js.adicionarCarrinho(
                            p.id,
                            p,
                            setProdutoComprar,
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
            </section>
          )}
        </section>
      </div>
    </section>
  );
}

export default Favoritos;