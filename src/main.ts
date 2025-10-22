import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('GearCash API')
    .setDescription('API para gerenciamento de vendas e estoque')
    .setVersion('1.0')
    .addTag('Autenticação', 'Endpoints de autenticação e autorização')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Habilitar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger apenas em desenvolvimento
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const PORT = process.env.PORT ?? 3000;

  if (NODE_ENV !== 'production') {
    setupSwagger(app);
    logger.log(`📚 Swagger disponível em: http://localhost:${PORT}/api/docs`);
  } else {
    logger.log('🔒 Swagger desabilitado em produção');
  }

  await app.listen(PORT);
  logger.log(`🚀 Aplicação rodando em: http://localhost:${PORT}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
