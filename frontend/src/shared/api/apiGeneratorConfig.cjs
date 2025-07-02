/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
  schemaFile: 'http://158.160.91.255/openapi.json', // 'http://127.0.0.1:8000/openapi.json',
  apiFile: `./emptyApi.ts`,
  apiImport: `emptySplitApi`,
  outputFile: `api.ts`,
  hooks: true,
};

module.exports = config;
