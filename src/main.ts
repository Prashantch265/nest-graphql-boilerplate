/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-20 10:36:16
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-20 12:26:05
 */

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import { loggerService, Stream } from './utils/logger';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { schema } from '@graphql/graphql.schema';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get('http.port');
  app.useLogger(loggerService());

  // TODO: Debug :- transform not working
  // app.useGlobalPipes(new CustomValidationPipe({ transform: true }));
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (process.env.NODE_ENV === 'development' || 'local')
    app.use(morgan('dev', { stream: new Stream(loggerService()) }));
  else app.use(morgan('combined', { stream: new Stream(loggerService()) }));

  // bodyparser for apollo server
  app.use(express.json());
  const server = new ApolloServer({ schema: schema });
  // initialize apollo server before expressMiddleware
  await server.start();
  app.use('/graphql', expressMiddleware(server));

  // listen nest application
  await app.listen(port, () => {
    console.info(`=================================`);
    console.info(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.info(`🚀 App listening on the port ${port}`);
    console.info(`=================================`);
  });
}
bootstrap();
