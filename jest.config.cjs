// // jest.config.mjs
// const { jest } = require('@jest/globals');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transforma archivos JS/JSX
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignora la transformación de archivos en node_modules
  ],
};




// module.exports = {
//   transform: {
//     '^.+\\.[t|j]sx?$': 'babel-jest',
//   },
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom'],
//   transformIgnorePatterns: [],

//   // transformIgnorePatterns: [
//   //   // '/node_modules/(?!your-module-to-transform)', // Reemplaza 'your-module-to-transform' si es necesario
//   // ],
// };


// module.exports = {
//   presets: [
//     "@babel/preset-env",
//     "@babel/preset-react", // Incluye si estás usando React
//   ],
//   plugins: ["@babel/plugin-transform-runtime"],

//   transform: {
//     "^.+\\.jsx?$": "babel-jest",
//   },
//   moduleFileExtensions: ['js', 'jsx'], // Agrega otras extensiones si es necesario
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
// };
// // // setupTests.js
// // import '@testing-library/jest-dom/extend-expect';

