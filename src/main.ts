import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // Configuração do tempo limite do servidor para 0 (sem tempo limite)
  //app.getHttpServer().setTimeout(0);

  

  console.log("waiting: 3066");
  await app.listen(3066);
}

bootstrap();
