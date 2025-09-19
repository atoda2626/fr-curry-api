/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",             // TypeScript 用に ts-jest を使う
  testEnvironment: "node",       // Express/DBなら node 環境で実行
  roots: ["<rootDir>/src"],      // テスト対象ディレクトリ
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
