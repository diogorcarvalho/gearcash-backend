import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME || 'gearcash_user',
  password: process.env.DATABASE_PASSWORD || 'gearcash_password',
  database: process.env.DATABASE_NAME || 'gearcash_db',

  entities: [
    'src/infrastructure/database/typeorm/entities/**/*.{js,ts}',
    'src/modules/**/infrastructure/database/typeorm/entities/**/*.{js,ts}',
  ],
  migrations: ['src/infrastructure/database/typeorm/migrations/**/*.{js,ts}'],

  synchronize: false, // Sempre false para migrations
  logging: true,
  migrationsTableName: 'migrations',
});
