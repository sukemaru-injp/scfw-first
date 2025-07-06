import 'dotenv/config'
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'scfw-first',
  frameworkVersion: '4',
  provider: {
    name: 'aws',
    runtime: 'nodejs22.x',
    region: 'ap-northeast-1',
    stage: 'dev',
    environment: {
      TEST: '${opt:test, "default-value"}', // デプロイ時に環境変数を設定可能
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        Resource: '*',
      },
    ],
  },
  functions: {
    app: {
      handler: 'dist/index.handler',
      events: [
        {
          httpApi: {
            path: '/{proxy+}',
            method: '*',
          },
        },
        {
          httpApi: {
            path: '/',
            method: '*',
          },
        },
      ],
      timeout: 30,
      memorySize: 512,
    },
  },
  package: {
    individually: false,
    patterns: [
      'dist/**',
      '!src/**',
      '!node_modules/**',
      '!.git/**',
      '!.vscode/**',
      '!*.md',
      '!tsconfig.json',
      '!esbuild.config.js',
    ],
  },
  build: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node22',
      format: 'esm',
      platform: 'node',
      mainFields: ['module', 'main'],
      conditions: ['import', 'node']
    },
  },
  plugins: ['serverless-offline'],
};

export default serverlessConfiguration;