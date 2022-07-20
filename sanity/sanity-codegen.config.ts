import { SanityCodegenConfig } from 'sanity-codegen'

const config: SanityCodegenConfig = {
  schemaPath: './schemas/schema.js',
  outputPath: '../app/interfaces/sanity.ts',
}

export default config