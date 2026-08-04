Readme · MD
🛒 DevStore

E-commerce de tecnologia construído em React como projeto de portfólio. O usuário navega pelo catálogo, pesquisa e filtra produtos, adiciona ao carrinho e simula uma compra do início ao fim.



📖 Sobre o projeto

DevStore simula uma loja online de eletrônicos (celulares, notebooks, periféricos e acessórios), cobrindo o fluxo completo de compra: descoberta do produto → carrinho → checkout. O foco do projeto é praticar consumo de API, gerenciamento de estado, roteamento e persistência de dados no front-end.

🔗 Demo: em breve 🎨 Protótipo visual: ver mock

✨ Funcionalidades
🏠 Home — banner principal, produtos em destaque e categorias
📦 Catálogo de produtos — listagem com imagem, nome, preço e avaliação
🔎 Busca e filtros — por nome, categoria e ordenação (menor preço, maior preço, melhor avaliação)
📄 Página de detalhes — imagem ampliada, descrição, seletor de quantidade
🛒 Carrinho — adicionar, remover, ajustar quantidade e cálculo automático do total, persistido em localStorage
❤️ Favoritos — salvos entre sessões via localStorage
💳 Checkout simulado — formulário de dados + resumo do pedido + confirmação
🛠️ Tecnologias
Categoria	Stack
Core	React + Vite
Roteamento	React Router
Estilização	Tailwind CSS
Estado global	Context API (carrinho)
Requisições	Fetch API
Persistência	LocalStorage
Dados de produto	Fake Store API
📸 Screenshots
Home	Produtos	Carrinho
adicionar print	adicionar print	adicionar print
🚀 Como rodar o projeto

Pré-requisitos: Node.js instalado.

bash
# clone o repositório
git clone https://github.com/seu-usuario/devstore.git

# entre na pasta
cd devstore

# instale as dependências
npm install

# rode o projeto
npm run dev

O projeto vai rodar em http://localhost:5173 (padrão do Vite).

📁 Estrutura de pastas
src/
├── assets/          # imagens, ícones, ilustrações
├── components/       # componentes reutilizáveis (Card, Header, Drawer, etc.)
├── context/           # Context API (CarrinhoContext)
├── pages/             # páginas (Home, Produtos, Detalhes, Checkout)
├── services/          # camada de integração com a API (servico.js)
├── routes/            # configuração do React Router
└── App.jsx
🗺️ Roadmap
 Listagem de produtos com Fake Store API
 Busca e filtros
 Carrinho com persistência em LocalStorage
 Favoritos
 Checkout simulado completo
 Migração de usuários e pedidos para Supabase (cadastro, login, banco de dados, histórico de pedidos)
 Testes automatizados
👤 Autor

Desenvolvido por Davi Afonso como parte do portfólio de front-end.

LinkedIn · GitHub

📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.