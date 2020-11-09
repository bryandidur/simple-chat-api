
## Instalação

1. Clonar o branch __master__ do repositório: `$ git clone https://github.com/bryandidur/simple-chat-api -b master`
1. Acessar pasta do projeto: `$ cd simple-chat-api`
1. Criar cópia do arquivo `.env.example` da raiz do projeto e nomear como `.env` no mesmo local
1. Iniciar containeres da aplicação: `docker-compose up -d`
1. Instalar dependências do NPM: `$ npm install`
1. Iniciar servidor de desenvolvimento: `$ npm run start:dev`

> __Dica__: As mensagens enviadas no chat são armazenadas na coleção `messages` do banco de dados `simple-chat`. Você pode visualizá-las usando uma ferramenta como o `MongoDB Compass`, com as seguintes informações: `host: localhost`, `port: 27017`
