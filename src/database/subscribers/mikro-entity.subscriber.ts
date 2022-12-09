/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-09 12:11:51
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-09 14:51:31
 */

import { EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import { RequestContextProvider } from 'src/context/express-http.context';

@Injectable()
export default class MikroEntitySubscriber implements EventSubscriber {
  @Inject()
  private readonly requestContextProvider: RequestContextProvider;

  async beforeCreate(args: EventArgs<any>): Promise<void> {
    const userId: string = this.requestContextProvider.get('user').sub;
    args.entity.createdBy = userId ? userId : null;
  }

  async beforeUpdate(args: EventArgs<any>): Promise<void> {
    const userId: string = this.requestContextProvider.get('user').sub;
    args.entity.updatedBy = userId ? userId : null;
  }
}
