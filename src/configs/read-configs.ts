/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 10:23:46
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 14:26:03
 */

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

let YAML_CONFIG_FILENAME;

if (process.env.NODE_ENV) {
  YAML_CONFIG_FILENAME = `${process.env.NODE_ENV}.config.yaml`;
}

export default function readConfigurations() {
  return yaml.load(
    readFileSync(join(__dirname + '/resources', YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
}
