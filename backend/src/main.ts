import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./exception/HttpExceptionFilter";
import cookieParser = require("cookie-parser");
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const port = configService.get("NODE_SERVER_PORT");
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname, "..", "img"));
  await app.listen(port);
}

bootstrap();
