# 🚀 Biko

> Uma rede social profissional para freelancers se conectarem e fecharem trabalhos diretamente.

---

## 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Fastify + TypeScript |
| ORM | Prisma 7 |
| Banco | PostgreSQL 16 |
| Auth | JWT + bcrypt |
| Validação | Zod |
| Frontend | React + Vite + TypeScript |
| HTTP | Axios |

---

## ▶️ Como rodar

### 1. Pré-requisitos
- Node.js 20+
- Docker Desktop (para o banco)

### 2. Suba o banco de dados

```bash
docker compose up -d
```

### 3. Backend — instale, rode a migration e inicie

```bash
cd server
npm install
npx prisma migrate dev --name init
npm run dev
```

> API rodando em `http://localhost:3000`

### 4. Frontend

```bash
cd web
npm install
npm run dev
```

> App rodando em `http://localhost:5173`

---

## 📡 Rotas da API

### Auth
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Cadastrar usuário |
| POST | `/auth/login` | Login + JWT |
| GET | `/auth/users/:id` | Perfil do usuário |

### Posts (🔒 = requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/posts` | Listar posts |
| POST 🔒 | `/posts` | Criar post |

### Jobs (🔒 = requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/jobs` | Listar vagas |
| POST 🔒 | `/jobs` | Criar vaga |

---

## 📁 Estrutura

```
Biko/
├── server/             # Backend Fastify
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── lib/
│       │   └── prisma.ts
│       ├── middlewares/
│       │   └── auth.ts
│       └── modules/
│           ├── user/
│           ├── post/
│           └── job/
├── web/                # Frontend React
│   └── src/
│       ├── components/
│       ├── pages/
│       └── lib/
└── docker-compose.yml
```