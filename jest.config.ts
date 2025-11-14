import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts', // if you already use this
    '<rootDir>/__mocks__/jest.swiper.mocks.tsx'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(avif|jpg|jpeg|png|webp|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.app.json'
      }
    ]
  },

  transformIgnorePatterns: [
    '/node_modules/(?!swiper|ssr-window|dom7).+\\.js$' // allow ESM in Swiper deps
  ],
  coverageReporters: ['text']
}

export default config
