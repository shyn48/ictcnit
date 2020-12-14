//import config from './config/index.js'
import { dirname } from 'path'
import { addPath } from 'app-module-path';

global.__dirname = dirname(fileURLToPath(import.meta.url))

console.log(__dirname);

addPath(__dirname)

import App from './src/index.js'
import { fileURLToPath } from 'url';

//global.config = config

new App()
