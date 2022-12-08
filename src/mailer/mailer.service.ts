/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 16:25:26
 * @Last Modified by:   prashant.chaudhary
 * @Last Modified time: 2022-12-08 16:25:26
 */

import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { loggerService } from 'src/utils/logger';

@Injectable()
export default class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}
  public sendMail(options: ISendMailOptions): void {
    this.mailerService
      .sendMail(options)
      .then((sentMessagInfo) => console.log(sentMessagInfo))
      .catch((err) => loggerService().error(err));
  }
}
