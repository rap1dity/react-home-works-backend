import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setAppSettings } from '@common/helpers/set-app-settings.helper';
import { environment } from '@src/environment';

async function bootstrap(): Promise<void> {
  let app = await NestFactory.create(AppModule);

  app = await setAppSettings(app, { enableSwagger: true });

  await app.listen(environment.app.port);
}

bootstrap();
