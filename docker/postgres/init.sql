-- Script de inicialização do banco PostgreSQL
-- Este script é executado automaticamente quando o container é criado pela primeira vez

-- Extensões necessárias para a aplicação
-- pg_trgm: Busca textual avançada (fuzzy search, autocomplete de produtos)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- citext: Texto case-insensitive (emails, usernames únicos)
CREATE EXTENSION IF NOT EXISTS "citext";

-- Configurar timezone
SET timezone = 'America/Sao_Paulo';

-- Otimizações para UUIDs gerados na aplicação (UUIDv7)
-- Como UUIDv7 são ordenáveis cronologicamente, otimizar índices
SET default_statistics_target = 100;

-- Criar índices para melhor performance (opcional)
-- Estes serão criados automaticamente pelas migrations do TypeORM

-- Log de inicialização
DO $$
BEGIN
    RAISE NOTICE 'Database % initialized successfully at %', current_database(), now();
    RAISE NOTICE 'Extensions loaded: pg_trgm (text search), citext (case-insensitive text)';
    RAISE NOTICE 'Optimized for application-generated UUIDv7 identifiers';
END $$;