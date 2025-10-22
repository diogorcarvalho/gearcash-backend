import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),

  // Entidades TypeORM (schemas de banco)
  entities: [__dirname + '/../database/typeorm/entities/**/*.{js,ts}'],

  // Configurações de desenvolvimento
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  logging:
    configService.get<string>('NODE_ENV') === 'development' ? 'all' : ['error'],

  // Configurações de migração
  migrations: [__dirname + '/../database/typeorm/migrations/**/*.{js,ts}'],
  migrationsRun: false,
  migrationsTableName: 'migrations',

  // Pool de conexões
  extra: {
    max: 10,
    min: 1,
    acquireTimeoutMillis: 60000,
    idleTimeoutMillis: 600000,
  },

  // Retry de conexão
  retryAttempts: 3,
  retryDelay: 3000,
  autoLoadEntities: true,
});
