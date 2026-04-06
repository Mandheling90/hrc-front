import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const frontRoot = resolve(import.meta.dirname, '..')
const workspaceRoot = resolve(frontRoot, '..')
const apiRoot = resolve(workspaceRoot, 'refer-api')
const apiSchemaPath = resolve(apiRoot, 'schema.graphql')
const frontSchemaPath = resolve(frontRoot, 'src/graphql/schema.graphql')

execFileSync('yarn', ['schema:export'], {
  cwd: apiRoot,
  stdio: 'inherit'
})

if (!existsSync(apiSchemaPath)) {
  throw new Error(`exported schema not found: ${apiSchemaPath}`)
}

mkdirSync(dirname(frontSchemaPath), { recursive: true })
copyFileSync(apiSchemaPath, frontSchemaPath)
console.log(`Copied schema to ${frontSchemaPath}`)

execFileSync('npx', ['graphql-codegen', '--config', 'codegen.ts'], {
  cwd: frontRoot,
  stdio: 'inherit'
})
