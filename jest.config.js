module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "!<rootDir>/node_modules/(?!(@jupyterlab/.*)/)",
    "!<rootDir>/node_modules/@jupyter-widgets/.*"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    "^file\-loader":"<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  testEnvironment: "jsdom"
};
