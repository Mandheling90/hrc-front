import type { CodegenConfig } from '@graphql-codegen/cli'

const graphqlEndpoint =
  process.env.CODEGEN_SCHEMA_URL ||
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  'http://localhost:8000/graphql'

const hospitalCodeHeader =
  process.env.CODEGEN_HOSPITAL_CODE ||
  process.env.NEXT_PUBLIC_HOSPITAL_CODE ||
  'ANAM'

const config: CodegenConfig = {
  schema: [
    {
      [graphqlEndpoint]: {
        headers: {
          'x-hospital-code': hospitalCodeHeader
        }
      }
    }
  ],
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
