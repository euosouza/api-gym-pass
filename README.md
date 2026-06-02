# GymPass

API REST no estilo GymPass para gerenciamento de academias e check-ins de usuários.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/) — framework HTTP
- [Prisma ORM](https://www.prisma.io/) — acesso ao banco de dados
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional
- [Zod](https://zod.dev/) — validação de schemas
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — hash de senhas
- [Vitest](https://vitest.dev/) — testes unitários
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — qualidade de código
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) — git hooks
- [Docker](https://www.docker.com/) — ambiente de banco de dados

---

## 📋 Requisitos

### RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível listar usuários;
- [x] Deve ser possível buscar um usuário pelo ID;
- [x] Deve ser possível atualizar um usuário;
- [x] Deve ser possível deletar um usuário;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas (até 10km);
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

---

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com separação clara entre camadas:

```
src/
├── http/
│   └── controllers/
│       └── users/         # Controllers HTTP (Fastify)
├── use-cases/
│   └── users/             # Casos de uso com regras de negócio
│       ├── register-user/
│       ├── list-users/
│       ├── get-bt-id-user/
│       ├── update-user/
│       ├── delete-user/
│       └── erros/         # Erros de domínio customizados
├── repositories/
│   ├── users.interface.repository.ts   # Interface do repositório
│   ├── users.repositories.ts           # Implementação Prisma
│   └── in-memory/                      # Implementação in-memory (testes)
├── routes/
│   ├── users.routes.ts
│   └── gyms.routes.ts
├── lib/                   # Configurações de bibliotecas (Prisma client)
├── env/                   # Validação de variáveis de ambiente (Zod)
├── app.ts
└── serve.ts
```

---

## 🛣️ Rotas disponíveis

### Usuários (`/users`)

| Método | Rota          | Descrição                     |
|--------|---------------|-------------------------------|
| GET    | `/users`      | Listar todos os usuários      |
| GET    | `/users/:id`  | Buscar usuário pelo ID        |
| POST   | `/users`      | Cadastrar novo usuário        |
| PUT    | `/users/:id`  | Atualizar dados de um usuário |
| DELETE | `/users/:id`  | Deletar um usuário            |

---

## ✅ Testes

O projeto utiliza **Vitest** com repositórios in-memory para isolamento dos testes unitários. Todos os 10 testes estão passando:

```
✓ get-bt-id-user.spec.ts    (2 testes)
✓ list-users.spec.ts        (1 teste)
✓ delete-user.spec.ts       (2 testes)
✓ register-user.spec.ts     (3 testes)
✓ update-user.spec.ts       (2 testes)

Test Files: 5 passed
Tests:      10 passed
```

---

## ⚙️ Instalação e execução

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

### Configuração

```bash
# Clone o repositório
git clone https://github.com/euosouza/gym-pass.git
cd gym-pass

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp env.example .env
# Edite o .env com suas configurações

# Suba o banco de dados com Docker
docker-compose up -d

# Execute as migrations do Prisma
npx prisma migrate dev

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

### Scripts disponíveis

| Comando               | Descrição                                |
|-----------------------|------------------------------------------|
| `npm run dev`         | Inicia o servidor em modo watch          |
| `npm run build`       | Compila o projeto para produção          |
| `npm start`           | Inicia o servidor compilado              |
| `npm test`            | Executa os testes uma vez                |
| `npm run test:watch`  | Executa os testes em modo watch          |
| `npm run test:coverage` | Gera relatório de cobertura            |
| `npm run test:ui`     | Abre a interface visual do Vitest        |
| `npm run lint`        | Verifica problemas de lint               |
| `npm run lint:fix`    | Corrige problemas de lint automaticamente|
| `npm run format`      | Formata o código com Prettier            |

---

## 🗄️ Banco de dados

O banco de dados é gerenciado pelo **Prisma ORM** e conta com os seguintes modelos:

- **User** — usuários da plataforma
- **CheckIn** — registros de check-in dos usuários nas academias
- **Gym** — academias cadastradas

Para visualizar e gerenciar os dados:

```bash
npx prisma studio
```
