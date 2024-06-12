import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://chat-server.vsezol.com/v3/api-docs',
  apiFile: './src/store/empty-api.ts',
  apiImport: 'emptyApi',
  outputFile: './src/store/fellow-api.ts',
  exportName: 'fellowApi',
  hooks: true,
};

export default config;
