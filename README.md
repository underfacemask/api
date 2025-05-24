# Zeus API

API RESTful desenvolvida com Node.js, Express e Sequelize, utilizando PostgreSQL como banco de dados. O projeto é containerizado com Docker e possui autenticação via JWT, além de funcionalidades de recuperação de senha por e-mail.

## 📚 Sumário

* [📚 Sumário](#-sumário)
* [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [⚙️ Instalação e Execução](#️-instalação-e-execução)
* [🧪 Testes](#-testes)
* [📂 Estrutura de Pastas](#-estrutura-de-pastas)
* [🔐 Autenticação](#-autenticação)
* [📬 Recuperação de Senha](#-recuperação-de-senha)
* [📄 Documentação das Rotas](#-documentação-das-rotas)
* [📝 Licença](#-licença)

## 🚀 Tecnologias Utilizadas

* Node.js
* Express
* Sequelize
* PostgreSQL
* JWT (JSON Web Token)
* Nodemailer
* Docker & Docker Compose
* dotenv
* bcryptjs
* express-rate-limit([GitHub][1], [ReadMe Documentation][2], [GitHub Docs][3])

## ⚙️ Instalação e Execução

### Pré-requisitos

* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

### Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/underfacemask/api.git
   cd api
   ```



2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_NAME=zeus
   JWT_SECRET=sua_chave_secreta
   MAIL_HOST=smtp.seuprovedor.com
   MAIL_PORT=587
   MAIL_USER=seu_email
   MAIL_PASS=sua_senha
   ```



3. Inicie os containers com Docker Compose:

   ```bash
   docker-compose up --build
   ```



4. A API estará disponível em `http://localhost:3333`.

## 🧪 Testes

Atualmente, não há testes automatizados implementados. Recomenda-se o uso de ferramentas como [Jest](https://jestjs.io/) ou [Mocha](https://mochajs.org/) para criação de testes unitários e de integração.

## 📂 Estrutura de Pastas

```bash
api/
├── config/                 # Configurações do projeto (database, mail)
├── src/
│   ├── apps/
│   │   ├── controllers/    # Lógica de controle das rotas
│   │   ├── models/         # Definição dos modelos Sequelize
│   │   └── routes/         # Definição das rotas da API
│   └── middlewares/        # Middlewares personalizados (auth, rate-limit)
├── .env                    # Variáveis de ambiente
├── docker-compose.yml      # Configuração do Docker Compose
└── dockerfile              # Dockerfile para a aplicação
```



## 🔐 Autenticação

A autenticação é realizada via JWT. Após o login, um token é retornado e deve ser enviado no header `Authorization` das requisições protegidas:

```http
Authorization: Bearer <seu_token>
```



O middleware `auth.js` localizado em `src/middlewares/` é responsável por validar o token e permitir o acesso às rotas protegidas.

## 📬 Recuperação de Senha

A funcionalidade de recuperação de senha permite que o usuário solicite um token para redefinir sua senha.

* **POST /password/forgot**: Envia um e-mail com o token de recuperação.
* **POST /password/reset**: Redefine a senha utilizando o token recebido.

Certifique-se de configurar corretamente as variáveis de ambiente relacionadas ao serviço de e-mail para que essa funcionalidade opere corretamente.

## 📄 Documentação das Rotas

A API possui as seguintes rotas principais:

* **POST /register**: Registro de novo usuário.
* **POST /login**: Autenticação do usuário.
* **GET /me**: Retorna as informações do usuário autenticado.
* **POST /password/forgot**: Solicita recuperação de senha.
* **POST /password/reset**: Redefine a senha com o token.

Para rotas adicionais relacionadas a entidades como `members`, `clients`, `projects` e `budgets`, consulte os arquivos de rotas correspondentes em `src/apps/routes/`.

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Sinta-se à vontade para contribuir com o projeto através de pull requests ou reportando issues.

[1]: https://github.com/public-apis/public-apis/blob/master/README.md?utm_source=chatgpt.com "public-apis/README.md at master - GitHub"
[2]: https://docs.readme.com/main/docs/rdme?utm_source=chatgpt.com "Syncing Docs via CLI / GitHub"
[3]: https://docs.github.com/rest?utm_source=chatgpt.com "GitHub REST API documentation"
