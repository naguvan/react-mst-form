require('ts-node').register({ compilerOptions: { module: 'commonjs' } });
const configure = require('./webpack.config.typed.ts');
module.exports = configure.default;
