/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-05 22:39:51
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-27 16:25:59
 */

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_ROUTE, true);
