import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import FormularioCompra from "./Formulario_Compra";
import * as servico from "../../../Servico/produtosService"

function Carrinho({setCarrinhoAberto, produtoComprar,setProdutoComprar, setMensagemCarrinho}) {
  const [checkoutAberto, setCheckoutAberto] = useState(false);


  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  const precoTotal = produtoComprar.reduce(
    (total, produto) => total + produto.preco * produto.quantidadeSelecionada,
    0,
  );

  return (
    <section
      id="carrinho"
      className="fixed inset-0 z-[1000] flex justify-end bg-black/80"
      onClick={() => setCarrinhoAberto(false)}
    >
      <section
        className="
          flex
          h-dvh
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
        <section className="flex shrink-0 items-center justify-between border-b border-cobre p-4 font-titulo">
          <h2>{checkoutAberto ? "Finalizar Compra" : "Seu Carrinho"}</h2>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setCarrinhoAberto(false)}
          >
            <CloseIcon />
          </button>
        </section>

        {!checkoutAberto ? (
          <>
            {/* Carrinho vazio */}
            {produtoComprar.length === 0 && (
              <section className="flex min-h-0 flex-1 flex-col items-center justify-start gap-y-2 pt-10 font-dados">
                <p>carrinho_vazio{"()"}</p>

                <p className="text-cobre">adicione produtos para continuar</p>
              </section>
            )}

            {/* Lista de produtos */}
            {produtoComprar.length > 0 && (
              <section className="scroll-carrinho flex min-h-0 flex-1 items-start justify-center overflow-y-auto px-10 pt-5 pb-10">
                <ul className="flex w-full flex-col gap-y-10 pr-2">
                  {produtoComprar.map((p, index) => (
                    <li
                      key={`${p.id}-${index}`}
                      className="flex gap-x-3 rounded-lg border border-cobre p-3 text-lg"
                    >
                      <div className="flex items-center justify-center">
                        <img
                          src={p.img}
                          alt={p.titulo}
                          className="w-[100px] object-contain"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-y-2">
                        <h2>{p.titulo}</h2>

                        <p>
                          <span className="mr-1 text-cobre">$</span>
                          {p.preco}
                        </p>

                        <div className="flex items-center gap-x-3">
                          <button
                            type="button"
                            className="cursor-pointer rounded-lg border border-cobre-claro/50 bg-fundo-card p-[1px]"
                          >
                            <RemoveIcon sx={{ fontSize: "20px" }} onClick={() => servico.diminuirItemsCarrinho(setProdutoComprar,p.id)}/>
                          </button>

                          <p className="text-lg">{p.quantidadeSelecionada}</p>

                          <button
                            type="button"
                            className="cursor-pointer rounded-lg border border-cobre-claro/50 bg-fundo-card p-[1px]"
                          >
                            <AddIcon sx={{ fontSize: "20px" }} onClick={() => servico.aumentarItemCarrinho(setProdutoComprar,p.id)}/>
                          </button>
                        </div>

                        <button
                          type="button"
                          className="w-fit cursor-pointer text-left text-perigo-remover"
                          onClick={() => servico.deletarCarrinho(setProdutoComprar,p.id)}
                        >
                          remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <FormularioCompra produtoComprar={produtoComprar} setCarrinhoAberto={setCarrinhoAberto} setMensagemCarrinho={setMensagemCarrinho} setProdutoComprar={setProdutoComprar}/>
        )}

        {/* Rodapé */}
        {produtoComprar.length > 0 && (
          <section className="w-full shrink-0 border-t border-cobre bg-fundo-pagina">
            <div className="flex justify-between p-5">
              <p className="font-titulo text-white/30">Total</p>
              <p>$ {precoTotal.toFixed(2)}</p>
            </div>

            <div className="pb-5 text-center">
              {!checkoutAberto ? (
                <button
                  type="button"
                  onClick={() => setCheckoutAberto(true)}
                  className="w-[300px] cursor-pointer rounded-lg bg-cobre p-2 text-center text-black transition-all duration-300 ease-in-out hover:bg-cobre-claro"
                >
                  Finalizar Compra
                </button>
              ) : (
                <button
                  type="submit"
                  form="formulario-compra"
                  className="w-[300px] cursor-pointer rounded-lg bg-cobre p-2 text-center text-black transition-all duration-300 ease-in-out hover:bg-cobre-claro"
                  onClick={() => 
                      setMensagemCarrinho("Pedido finalizado com sucesso!")
                  }
                >
                  Confirmar Pedido
                </button>
              )}
            </div>
          </section>
        )}
      </section>
    </section>
  );
}

export default Carrinho;
