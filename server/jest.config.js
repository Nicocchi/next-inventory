/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@interface": "<rootDir>/src/interface/",
    "^interface": "<rootDir>/src/interface/",
    "^@orm": "<rootDir>/src/orm/",
    "^orm": "<rootDir>/src/orm/",
    "^@services": "<rootDir>/src/services/",
    "^services": "<rootDir>/src/services/",
    "^@utils": "<rootDir>/src/utils/",
    "^utils": "<rootDir>/src/utils/",
    "^@types": "<rootDir>/src/types/",
    "^types": "<rootDir>/src/types/",
    "^interface": "<rootDir>/src/interface",
    "^@interface": "<rootDir>/src/interface",
  },
};
