export default {
    testEnvironment: 'jsdom', // Use "node" if not testing DOM
    verbose: true, // Show passed tests in console
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest", // Use Babel for JS files
    },
    moduleNameMapper: {
      '^@src(.*)$': '<rootDir>/src$1', // Webpack alias resolution
    },
}