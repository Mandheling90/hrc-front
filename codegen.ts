import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  documents: [
    'src/graphql/**/*.ts',
    '!src/graphql/econsult/**/*.ts',
    '!src/graphql/hospital/medical-staff-queries.ts'
  ],
  generates: {
    'src/graphql/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        avoidOptionals: {
          field: true
        },
        // 스키마에 아직 반영되지 않은 API가 있어 document validation 비활성화
        strictScalars: false
      }
    }
  },
  ignoreNoDocuments: true,
  config: {
    skipDocumentsValidation: true
  }
}

export default config
