/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 10:24:32
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-20 12:33:10
 */

import MikroEntitySubscriber from '@database/subscribers/mikro-entity.subscriber';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import readConfigurations from './read-configs';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { Utils } from '@mikro-orm/core';

const NODE_ENV = process.env.NODE_ENV;

const mongooseConnection = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => {
  const mongoConfig = configService.get('database.mongodb');
  const connectionName = `mongodb://${mongoConfig.userName}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}`;

  return {
    uri: connectionName,
    retryAttempts: 1,
    dbName: mongoConfig.database,
  };
};

const pgConnectionForTypeOrm = (): PostgresConnectionOptions => {
  const config = readConfigurations();
  const configService: ConfigService = new ConfigService<
    Record<string, unknown>,
    false
  >(config);
  const postgresConfig = configService.get('database.postgres');
  return {
    type: 'postgres',
    host: postgresConfig.host,
    port: postgresConfig.port,
    username: postgresConfig.username,
    password: postgresConfig.password,
    database: postgresConfig.database,
    logging: process.env.NODE_ENV === 'local' || 'development' ? true : false,
    logger: 'debug',
    entities: [`${__dirname}/../core/**/*.entity.{ts,js}`],
    migrations: [`${__dirname}/../database/migrations/*.{ts,js}`],
    subscribers: [
      `${__dirname}/../database/subscribers/typeorm-entity.subscriber.{ts,js}`,
    ],
  };
};

const pgConnectionForMikroOrm = (): MikroOrmModuleSyncOptions => {
  const config = readConfigurations();
  const configService: ConfigService = new ConfigService<
    Record<string, unknown>,
    false
  >(config);
  const postgresConfig = configService.get('database.postgres');
  return {
    type: 'postgresql',
    dbName: postgresConfig.database,
    // entities: ['./dist/core/**/*.entity.js'],
    entitiesTs: ['./src/core/**/*.entity.ts'],
    subscribers: [new MikroEntitySubscriber()],
    autoLoadEntities: true,
    host: postgresConfig.host,
    port: postgresConfig.port,
    user: postgresConfig.username,
    password: postgresConfig.password,
    migrations: {
      tableName: 'migrations',
      path: Utils.detectTsNode()
        ? './src/database/migrations/'
        : './dist/database/migrations/',
      glob: '!(*.d).{js,ts}',
      transactional: true,
      emit: 'ts',
      snapshot: true,
      generator: TSMigrationGenerator,
    },
  };
};

export { mongooseConnection, pgConnectionForTypeOrm, pgConnectionForMikroOrm };
