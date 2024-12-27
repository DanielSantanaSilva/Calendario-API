# Calendario de Eventos

Uma aplicação web de calendário de eventos onde usuário pode gerenciar sua agenda pessoal.

## Sobre o Projeto

Este projeto é uma aplicação fullstack que permite aos usuários:
- Criar uma conta pessoal
- Fazer login/logout
- Criar, editar e excluir eventos
- Visualizar eventos em formato de calendário


## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB
- JWT para autenticação
- Bcrypt para criptografia

## Estrutura do Projeto

```

└── Calendario-API/
   │   ├── controllers/
   │   ├── db/
   │   ├── helpers/
   │   ├── models/
   │   └── routes/
```

## Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- NPM ou Yarn
- MongoDB

### Configuração

1. Clone os repositórios
```bash
git clone https://DanielSantanaSilva/Calendario-API.git
cd Calendario-API
```

```bash
git clone https://DanielSantanaSilva/Calendario-de-Eventos.git
cd Calendario-de-Eventos
```

2. Instale as dependências do backend
```bash
cd Calendario-API
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta backend com:
```
MONGO_URI=sua_uri_do_mongodb
JWT_SECRET=seu_segredo_jwt
```

4. Instale as dependências do frontend
```bash
cd ../Calendario-de-Eventos
npm install
```

## Como Executar

1. Inicie o MongoDB
```bash
mongod
```

2. Inicie o servidor backend
```bash
cd Calendario-API
npm start
```

3. Inicie o cliente frontend
```bash
cd Calendario-de-Eventos
npm start
```

4. Acesse a aplicação em `http://localhost:3000`

## Funcionalidades

- **Autenticação**: Sistema completo de registro e login
- **Gerenciamento de Eventos**: CRUD completo de eventos
- **Visualização de Calendário**: Interface intuitiva em formato de calendário


## Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.


## Desenvolvedor

Daniel Santana Silva