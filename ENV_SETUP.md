# Configuração de Variáveis de Ambiente

Este projeto utiliza o `@nestjs/config` para gerenciar variáveis de ambiente para diferentes ambientes de execução.

## Arquivos de Ambiente

- `.env` - Configurações padrão (usado quando NODE_ENV não está definido)
- `.env.development` - Configurações para desenvolvimento
- `.env.staging` - Configurações para homologação (HMOL)
- `.env.production` - Configurações para produção

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Homologação/Staging
npm run start:staging

# Produção (após build)
npm run build
npm run start:prod
```

## Variáveis Disponíveis

### Servidor
- `NODE_ENV` - Ambiente atual (development, staging, production)
- `PORT` - Porta do servidor (padrão: 3000)
- `API_VERSION` - Versão da API (padrão: v1)
- `API_PREFIX` - Prefixo da API (padrão: api)

### Banco de Dados
- `DATABASE_HOST` - Host do banco de dados
- `DATABASE_PORT` - Porta do banco de dados
- `DATABASE_USERNAME` - Usuário do banco
- `DATABASE_PASSWORD` - Senha do banco
- `DATABASE_NAME` - Nome do banco

### JWT
- `JWT_SECRET` - Chave secreta para JWT
- `JWT_EXPIRES_IN` - Tempo de expiração do token

### Redis
- `REDIS_HOST` - Host do Redis
- `REDIS_PORT` - Porta do Redis

### Logs
- `LOG_LEVEL` - Nível de log (debug, info, error)

### CORS
- `CORS_ORIGIN` - Origem permitida para CORS

### SSL (Produção)
- `HTTPS_ENABLED` - Habilitar HTTPS
- `SSL_CERT_PATH` - Caminho do certificado SSL
- `SSL_KEY_PATH` - Caminho da chave SSL

## Como Usar

### 1. Injetar ConfigService

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  constructor(private configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('PORT', 3000);
  }
}
```

### 2. Verificar Ambiente

```typescript
// Verificar se está em produção
if (this.configService.get('NODE_ENV') === 'production') {
  // lógica para produção
}

// Ou usar o service de exemplo
if (this.configExampleService.isProduction()) {
  // lógica para produção
}
```

### 3. Configuração de Banco (exemplo com TypeORM)

```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  autoLoadEntities: true,
  synchronize: configService.get('NODE_ENV') === 'development',
});
```

## Segurança

⚠️ **IMPORTANTE**: 
- Nunca commite arquivos `.env` com dados sensíveis
- Use senhas seguras em staging e produção
- Rotacione as chaves JWT regularmente
- Configure HTTPS em produção

## Exemplo de Uso Completo

Veja o arquivo `src/config-example.service.ts` para exemplos de como usar as variáveis de ambiente em seus serviços.