# GearCash Backend

API para gerenciamento de vendas e estoque.

## 🚀 Tecnologias

- **NestJS 11** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **PostgreSQL 15** - Banco de dados
- **TypeORM** - ORM
- **JWT** - Autenticação
- **Swagger/OpenAPI** - Documentação da API
- **Docker** - Containerização
- **UUIDv7** - Identificadores únicos cronológicos

## 📋 Pré-requisitos

- Node.js 18+
- Docker & Docker Compose
- npm ou yarn

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Subir containers Docker
docker-compose up -d

# Iniciar aplicação em desenvolvimento
npm run start:dev
```

## 📚 Documentação da API (Swagger)

A documentação interativa da API está disponível **apenas em ambiente de desenvolvimento**:

```
http://localhost:3000/api/docs
```

### Como usar o Swagger:

1. Acesse a URL acima com o servidor rodando
2. Explore os endpoints disponíveis
3. Para testar rotas protegidas:
   - Faça login no endpoint `POST /auth/login`
   - Copie o `accessToken` da resposta
   - Clique no botão **"Authorize"** no topo da página
   - Cole o token e clique em **"Authorize"**
   - Agora você pode testar endpoints protegidos como `/auth/me`

### ⚠️ Importante

- **Swagger é desabilitado automaticamente em produção** (`NODE_ENV=production`)
- Não exponha a documentação em ambientes de produção por questões de segurança

## 🔐 Autenticação

A API usa autenticação JWT com refresh tokens:

### Endpoints públicos:
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Fazer login
- `POST /auth/refresh` - Renovar access token

### Endpoints protegidos (requerem JWT):
- `GET /auth/me` - Obter dados do usuário autenticado
- `POST /auth/logout` - Fazer logout

### Roles disponíveis:
- `admin` - Administrador (acesso total)
- `supervisor` - Supervisor (acesso intermediário)
- `seller` - Vendedor (role padrão, acesso básico)

## 🗄️ Banco de Dados

### Migrations

```bash
# Gerar nova migration
npm run migration:generate -- src/infrastructure/database/typeorm/migrations/NomeDaMigration

# Executar migrations pendentes
npm run migration:run

# Reverter última migration
npm run migration:revert
```

### Reset do banco (desenvolvimento)

```bash
docker exec -i gearcash_postgres psql -U gearcash_user -d postgres -c "DROP DATABASE IF EXISTS gearcash_db;"
docker exec -i gearcash_postgres psql -U gearcash_user -d postgres -c "CREATE DATABASE gearcash_db;"
npm run start:dev  # TypeORM irá sincronizar o schema automaticamente
```

## 🏗️ Arquitetura

O projeto segue princípios de **Clean Architecture** com separação em camadas:

```
src/
├── modules/              # Módulos de funcionalidade
│   └── auth/
│       ├── domain/       # Entidades e regras de negócio
│       ├── application/  # Use cases e DTOs
│       ├── infrastructure/ # Implementações (TypeORM, etc)
│       └── presentation/ # Controllers
├── shared/               # Código compartilhado
│   ├── decorators/
│   ├── guards/
│   └── utils/
└── infrastructure/       # Configurações globais
    ├── config/
    └── database/
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Iniciar em modo watch

# Build
npm run build              # Compilar para produção
npm run start:prod         # Iniciar versão compilada

# Testes
npm run test               # Executar testes unitários
npm run test:e2e           # Executar testes E2E
npm run test:cov           # Executar testes com cobertura

# Linting
npm run lint               # Verificar código
npm run format             # Formatar código
```

## 🌍 Variáveis de Ambiente

```env
NODE_ENV=development       # Ambiente (development, production)
PORT=3000                  # Porta da aplicação

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=gearcash_user
DATABASE_PASSWORD=gearcash_password
DATABASE_NAME=gearcash_db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
```

## 🐳 Docker

```bash
# Subir todos os containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Rebuild containers
docker-compose up -d --build
```

## 📦 Características Implementadas

- ✅ Autenticação JWT com refresh tokens
- ✅ Autorização baseada em roles
- ✅ Documentação Swagger/OpenAPI
- ✅ UUIDv7 para IDs (ordenação cronológica)
- ✅ Validação de DTOs
- ✅ Guards customizados (JWT, Roles, Admin)
- ✅ Decorators customizados (@Public, @Roles, @CurrentUser)
- ✅ TypeORM com PostgreSQL
- ✅ Docker Compose para desenvolvimento
- ✅ Proteção de Swagger em produção

## 📄 Licença

Este projeto é privado e confidencial.

## 👥 Contato

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.
