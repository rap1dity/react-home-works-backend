import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { Reflector } from '@nestjs/core';
import { AllExceptionsFilter } from '@common/filters/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { CUSTOM_JS, getCustomCss, SWAGGER_AUTH_NAME, SWAGGER_TITLE, SWAGGER_URL } from '@common/configs/swagger.config';

export const setAppSettings = async (
  app: INestApplication,
  options: { enableSwagger: boolean },
): Promise<INestApplication> => {
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  if (options.enableSwagger) {
    setUpSwagger(app);
  }

  app.enableShutdownHooks();

  return app;
};

function setUpSwagger<T extends INestApplication<unknown>>(app: T): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      SWAGGER_AUTH_NAME,
    )
    .addSecurityRequirements(SWAGGER_AUTH_NAME)
    .build();

  const themes = new SwaggerTheme();
  const lightThemeCss = themes.getBuffer(SwaggerThemeNameEnum.CLASSIC);
  const darkThemeCss = themes.getBuffer(SwaggerThemeNameEnum.DARK);

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(SWAGGER_URL, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
    customCss: getCustomCss(darkThemeCss, lightThemeCss),
    customJsStr: CUSTOM_JS,
  });
}
