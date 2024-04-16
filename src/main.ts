import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('PDV - App')
    .setDescription('Api para aplicação pdv')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customfavIcon: "src/resources/logologo.jpeg",
    swaggerOptions: {
      backgroundColor: '#000000'
    }
  });

  console.log("waiting: 3066");
  await app.listen(3066);
}

bootstrap();
