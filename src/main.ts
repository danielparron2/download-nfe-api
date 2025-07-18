import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('Documentação da API de Usuários')
    .setVersion('1.0')
    .addTag('downloadxmls') // Define a categoria da rota
    .build();

  const document = SwaggerModule.createDocument(app, config);
  //SwaggerModule.setup('swagger', app, document);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      syntaxHighlight: {
        activate: false,
      },
    },
  });

  // Habilita o CORS para o domínio específico
  app.enableCors({
    //origin: 'http://localhost:3001',
    origin: 'http://35.239.97.39', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();