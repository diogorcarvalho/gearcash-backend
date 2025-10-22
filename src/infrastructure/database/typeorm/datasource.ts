import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),

  entities: ['src/infrastructure/database/typeorm/entities/**/*.{js,ts}'],
  migrations: ['src/infrastructure/database/typeorm/migrations/**/*.{js,ts}'],

  synchronize: false, // Sempre false para migrations
  logging: true,
  migrationsTableName: 'migrations',
});
