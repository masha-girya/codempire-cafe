import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { DEV_CONSTANTS as DEV } from '@constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = DEV.PORT || DEV.PORT_DEV;
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`WORKING ON ${PORT}`);
}
bootstrap();
