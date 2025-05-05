const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^.+\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    '^.+\\.(html)$': '<rootDir>/src/_mocks/html.mock.ts',
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
  },
  transformIgnorePatterns: [
    'node_modules/(?!@angular|rxjs)',
  ],
  extensionsToTreatAsEsm: ['.ts'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      outputPath: 'test-report/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ]
};