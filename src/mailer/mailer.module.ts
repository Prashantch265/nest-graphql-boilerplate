/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 16:24:52
 * @Last Modified by:   prashant.chaudhary
 * @Last Modified time: 2022-12-08 16:24:52
 */

import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { mailerConfigs } from './mailer.configs';
import NodeMailerService from './mailer.service';

@Module({
  imports: [MailerModule.forRoot(mailerConfigs())],
  providers: [NodeMailerService],
  exports: [MailerModule, NodeMailerService],
})
export default class NodeMailerModule {}
