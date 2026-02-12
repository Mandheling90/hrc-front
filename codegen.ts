import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  documents: ['src/graphql/**/*.ts'],
  generates: {
    'src/graphql/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        avoidOptionals: {
          field: true
        }
      }
    }
  },
  ignoreNoDocuments: true
}

export default config
