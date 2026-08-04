function Botao({ children, className = "", ...props }) {
  return (
    <button
      className={`cursor-pointer border border-borda-padrao p-2 rounded-xl transition-all lg:hover:bg-fundo-card-hover lg:duration-300 lg:ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Botao;