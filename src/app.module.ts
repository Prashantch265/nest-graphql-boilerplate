/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 11:04:41
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 17:32:17
 */

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  CacheModule,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configs/configuration.module';
import {
  mongooseConnection,
  pgConnectionForTypeOrm,
  pgConnectionForMikroOrm,
} from './configs/db-connection.config';
import ContextModule from './context/context.module';
import { HttpContextMiddleware } from './context/express-http.context';
import { importClassesFromDirectories } from './utils/file-to-class-converter';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { loggerService } from './utils/logger';
import NodeMailerModule from './mailer/mailer.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: process.env.NODE_ENV === 'local' || 'development' ? true : false,
      /**
       * Code first
       * The autoSchemaFile property value is the path where your automatically generated schema will be created.
       * Alternatively, the schema can be generated on-the-fly in memory. To enable this, set the autoSchemaFile property to true.
       */
      autoSchemaFile: `${__dirname}/graphql/schemas.gql`,
    }),
    CacheModule.register({ isGlobal: true, ttl: 0 }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ConfigurationModule,
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) =>
    //     mongooseConnection(configService),
    // }),
    // TypeOrmModule.forRoot({
    //   ...pgConnectionForTypeOrm(),
    //   retryAttempts: 5,
    //   autoLoadEntities: true,
    // }),
    MikroOrmModule.forRoot({
      ...pgConnectionForMikroOrm(),
      logger: loggerService,
    }),
    ContextModule,
    NodeMailerModule,
    ...importClassesFromDirectories(),
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpContextMiddleware).forRoutes('*');
  }
}
