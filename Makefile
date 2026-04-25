# Biko — Scripts de desenvolvimento

# Sobe o banco de dados PostgreSQL via Docker
db:
	docker compose up -d

# Para o banco
db-stop:
	docker compose down

# Roda a migration do Prisma
migrate:
	cd server && npx prisma migrate dev --name init

# Abre o Prisma Studio
studio:
	cd server && npx prisma studio

# Inicia o servidor backend (dev)
server:
	cd server && npm run dev

# Instala dependências do frontend e inicia
web:
	cd web && npm run dev

.PHONY: db db-stop migrate studio server web
