import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import hardware from "../../assets/hero-circuito.svg";

function Inicio() {
    
    return (
        <section className="text-white flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:items-center mt-2">
            <section className="flex flex-col gap-y-2 items-center text-center lg:text-left lg:items-start">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-cobre rounded-full"></span>
                    <h3 className="text-cobre">Catálogo v1.0</h3>
                </div>

                <h2 className="font-titulo font-bold text-5xl max-w-[600px] lg:text-6xl">
                    Hardware de verdade para quem <span className="text-cobre">constrói</span> de verdade.
                </h2>

                <p className="text-texto-secundario text-[17px] mb-5 max-w-[600px]">
                    Celulares, notebooks, periféricos e acessórios selecionados com specs claras e preço justo. Sem enrolação — só o que importa antes de comprar.
                </p>

                <a
                    href="#categorias"
                    className="flex items-center gap-x-2 bg-cobre text-black py-4 px-8 w-[200px] rounded-xl font-semibold lg:hover:bg-cobre-claro lg:hover:-translate-y-[1px] transition-all lg:duration-300 lg:ease-in-out"
                >
                    Ver produtos
                    <ArrowForwardIcon />
                </a>
            </section>

            <section className='mb-10'>
                <img
                    src={hardware}
                    alt="imagem de uma peça de computador"
                    className="w-70 lg:w-[420px]"
                />
            </section>
        </section>
    );
}

export default Inicio;