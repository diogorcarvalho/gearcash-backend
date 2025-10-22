# 🐳 Docker Setup - GearCash Backend

Este projeto utiliza Docker Compose para gerenciar os serviços de banco de dados e cache.

## 📦 Serviços Incluídos

- **PostgreSQL 15**: Banco de dados principal (porta 5432)
- **Redis 7**: Cache e sessões (porta 6379)

## 🚀 Comandos Rápidos

### Iniciar todos os serviços
```bash
npm run docker:up
```

### Verificar status dos containers
```bash
npm run docker:status
```

### Ver logs em tempo real
```bash
npm run docker:logs
```

### Parar todos os serviços
```bash
npm run docker:down
```

### Reiniciar serviços
```bash
npm run docker:restart
```

### Limpar tudo (⚠️ Remove dados!)
```bash
npm run docker:clean
```

## 🔧 Configuração

### Variáveis de Ambiente
O Docker Compose utiliza as variáveis do arquivo `.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=gearcash_user
DATABASE_PASSWORD=gearcash_password
DATABASE_NAME=gearcash_db
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Conexão com o Banco
Após iniciar os containers, a aplicação NestJS pode conectar diretamente:

```typescript
// Exemplo de configuração TypeORM
{
  host: 'localhost',
  port: 5432,
  username: 'gearcash_user',
  password: 'gearcash_password',
  database: 'gearcash_db',
}
```

## 📊 Monitoramento

### Health Checks
Os containers incluem health checks automáticos:
- **PostgreSQL**: Verifica se o banco está aceitando conexões
- **Redis**: Testa o comando PING

### Verificar saúde dos containers
```bash
docker-compose ps
```

## 🗄️ Persistência de Dados

Os dados são persistidos em volumes Docker:
- `postgres_data`: Dados do PostgreSQL
- `redis_data`: Dados do Redis

### Backup do banco (opcional)
```bash
docker exec gearcash_postgres pg_dump -U gearcash_user gearcash_db > backup.sql
```

### Restaurar backup (opcional)
```bash
docker exec -i gearcash_postgres psql -U gearcash_user gearcash_db < backup.sql
```

## 🔍 Troubleshooting

### Container não inicia
```bash
# Ver logs detalhados
docker-compose logs postgres
docker-compose logs redis
```

### Porta já em uso
Se as portas 5432 ou 6379 já estiverem em uso, edite o arquivo `.env`:
```env
DATABASE_PORT=5433
REDIS_PORT=6380
```

### Resetar dados completamente
```bash
npm run docker:clean
npm run docker:up
```

## 🌐 Redes

Os containers utilizam a rede `gearcash_network` para comunicação interna.

## 📋 Próximos Passos

1. **Instalar TypeORM**: `npm install @nestjs/typeorm typeorm pg`
2. **Configurar entidades**: Criar modelos de dados
3. **Executar migrations**: Criar estrutura do banco
4. **Implementar autenticação**: JWT com usuários persistidos

---

💡 **Dica**: Mantenha os containers rodando durante o desenvolvimento para melhor performance!