import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://chat-server.vsezol.com/v3/api-docs',
  apiFile: './src/shared/api/rest/empty-api.ts',
  apiImport: 'emptyApi',
  outputFile: './src/shared/api/rest/generated-api.ts',
  exportName: 'generatedApi',
  hooks: true,
};

export default config;
