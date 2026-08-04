function FormularioCompra({produtoComprar,setCarrinhoAberto,setMensagemCarrinho,setProdutoComprar}){
    function enviarForm(e){
        e.preventDefault();;
        setCarrinhoAberto(false)
        setMensagemCarrinho("Pedido finalizado com sucesso!")
        setProdutoComprar([])
        localStorage.removeItem("carrinho");
    }

    return (
      <section className="scroll-carrinho min-h-0 flex flex-col gap-y-10  flex-1 overflow-y-auto px-10 pt-5 pb-10">
        <section className="mb-8">
          <div className="flex items-center">
            <h2 className="mb-2 mr-2">Resumo do pedido</h2>
            <span className="bg-cobre flex-1 h-[1px] block"></span>
          </div>
          <ul className="border border-cobre p-5 gap-y-3 flex flex-col rounded-lg bg-fundo-card text-base">
            {produtoComprar.map((p) => (
              <li className="flex gap-x-2 justify-between" key={p.id}>
                <div className="flex gap-x-2">
                  <p>{p.titulo} x</p>
                  <p>{p.quantidadeSelecionada}</p>
                </div>
                <p>${p.preco * p.quantidadeSelecionada}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div className="flex items-center mb-5">
            <h2 className=" mr-2">Dados de Entrega</h2>
            <span className="bg-cobre flex-1 h-[1px] block"></span>
          </div>
          <form
            autoComplete="On"
            className="flex flex-col gap-y-4"
            onSubmit={enviarForm}
            id="formulario-compra"
          >
            <div className="flex flex-col gap-y-2">
              <label htmlFor="i-nome">Nome Completo</label>
              <input
                type="text"
                id="i-nome"
                placeholder="Digite seu nome completo"
                className="border border-cobre-claro bg-fundo-card p-2 rounded-lg 
                        text-[16px] outline-none focus:border-cobre focus:outline-none focus:ring-0 oun"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="i-email">E-mail</label>
              <input
                type="email"
                id="i-email"
                placeholder="exemplo@email.com"
                className="border border-cobre-claro bg-fundo-card p-2 rounded-lg 
                        text-[16px] outline-none focus:outline-none focus:outline-none focus:ring-0 oun"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="i-endereco">Endereço</label>
              <input
                type="text"
                id="i-endereco"
                placeholder="Rua, número, bairro e cidade"
                className="border border-cobre-claro bg-fundo-card p-2 rounded-lg text-[16px] outline-none focus:ring-0 focus:outline-none focus:ring-0"
                required
              />
            </div>
          </form>
        </section>
        
      </section>
    );
}

export default FormularioCompra