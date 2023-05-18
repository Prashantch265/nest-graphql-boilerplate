/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-20 11:35:43
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-20 12:25:06
 */

import * as fs from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  importClassesFromDirectories,
  readFilesFromFolder,
} from '@utils/file-to-class-converter';

let typeDefs = '';

//read all resolvers
const paths: string[] = readFilesFromFolder(`${__dirname}/../core/`, [
  'resolver.ts',
  'resolver.js',
]);

const resolvers = importClassesFromDirectories(paths);

//read all files from typeDefs directory
typeDefs += fs.readFileSync(`${__dirname}/schemas.gql`, {
  encoding: 'utf8',
});

const schema = makeExecutableSchema({
  typeDefs: typeDefs,

  resolvers,
});

export { schema };
