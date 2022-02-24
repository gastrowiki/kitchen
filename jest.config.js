module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules'],
  setupFiles: ['<rootDir>/.jest/setupEnvVars.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
