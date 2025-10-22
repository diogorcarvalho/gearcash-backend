import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigExampleService {
  constructor(private configService: ConfigService) {}

  getServerConfig() {
    return {
      port: this.configService.get<number>('PORT', 3000),
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
      apiVersion: this.configService.get<string>('API_VERSION', 'v1'),
      apiPrefix: this.configService.get<string>('API_PREFIX', 'api'),
    };
  }

  getDatabaseConfig() {
    return {
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
    };
  }

  getJwtConfig() {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    };
  }

  getRedisConfig() {
    return {
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    };
  }

  // Método para verificar se estamos em produção
  isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  // Método para verificar se estamos em desenvolvimento
  isDevelopment(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'development';
  }

  // Método para verificar se estamos em staging (HMOL)
  isStaging(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'staging';
  }
}
