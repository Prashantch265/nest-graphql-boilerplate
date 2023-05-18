/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 11:04:41
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-19 17:24:08
 */

import { ConfigurationModule } from '@configs/configuration.module';
import { pgConnectionForTypeOrm } from '@configs/db-connection.config';
import ContextModule from '@context/context.module';
import { HttpContextMiddleware } from '@context/express-http.context';
import NodeMailerModule from '@mailer/mailer.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import {
  CacheModule,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { importClassesFromDirectories } from '@utils/file-to-class-converter';
import { loggerService } from '@utils/logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      autoSchemaFile: `src/graphql/schemas.gql`,
    }),
    CacheModule.register({ isGlobal: true, ttl: 0 }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ConfigurationModule,

    /**
     * Mongoose Connection
     */
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) =>
    //     mongooseConnection(configService),
    // }),

    /**
     * TypeOrm Connection
     */
    TypeOrmModule.forRoot({
      ...pgConnectionForTypeOrm(),
      retryAttempts: 5,
      autoLoadEntities: true,
    }),

    /**
     * MikroOrm Connection
     */
    // MikroOrmModule.forRoot({
    //   ...pgConnectionForMikroOrm(),
    //   logger: loggerService,
    // }),

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
