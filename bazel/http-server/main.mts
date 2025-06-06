/**
 * @license
 * Copyright Google LLC
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import yargs from 'yargs';
import assert from 'node:assert';

import {HttpServer} from './server.mjs';
import {setupBazelWatcherSupport} from './ibazel.mjs';

const {
  rootPaths,
  historyApiFallback,
  enableDevUi,
  environmentVariables,
  port: cliPort,
  relaxCors,
} = yargs(process.argv.slice(2))
  .strict()
  .option('port', {
    type: 'number',
    default: 4200,
  })
  .option('historyApiFallback', {type: 'boolean', default: false})
  .option('rootPaths', {type: 'array', string: true, default: ['']})
  .option('environmentVariables', {type: 'array', string: true, default: []})
  .option('enableDevUi', {type: 'boolean', default: false})
  .option('relaxCors', {type: 'boolean', default: false})
  .parseSync();

let port = cliPort;
// Process environment port always overrides the CLI, or rule attribute-specified port.
if (process.env.PORT !== undefined) {
  port = Number(process.env.PORT);
  assert(!isNaN(port), 'Expected `PORT` environment variable to be a valid number.');
}

// In non-test executions, we will never allow for the browser-sync dev UI.
const enableUi = process.env.TEST_TARGET === undefined && enableDevUi;
const server = new HttpServer(
  port,
  rootPaths,
  enableUi,
  historyApiFallback,
  environmentVariables,
  relaxCors,
);

// Setup ibazel support.
setupBazelWatcherSupport(server);

// Start the server. The server will always bind to the loopback and
// the public interface of the current host.
server.start();
