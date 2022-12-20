/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-12 11:29:01
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-12 11:38:03
 */

import { defineConfig } from '@mikro-orm/core';
import { pgConnectionForMikroOrm } from './src/configs/db-connection.config';

const MikroOrmDataSource = defineConfig({ ...pgConnectionForMikroOrm() });

export default MikroOrmDataSource;
