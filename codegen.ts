import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://inctagram.work/api/v1/graphql',
    documents: ['./src/**/*.ts', '!./src/types.ts', '!./src/**/*.generated.tsx'],
    ignoreNoDocuments: true,
    generates: {
        // Client preset генерирует всё необходимое в одну папку
        './src/gql/': {
            preset: 'client',
            config: {
                useTypeImports: true,
                enumsAsConst: true,
                scalars: {
                    DateTime: 'string'
                }
            }
        }
    },
};

export default config;