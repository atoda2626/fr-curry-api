# fr-curry-api

## 使用技術

### ツール

- [Node.js](https://nodejs.org/): 実行環境
- [Yarn](https://yarnpkg.com/): ビルドツール
- [tsx](https://tsx.is/): TypeScript 実行ツール
- [Biome](https://biomejs.dev/): フォーマット、リントツール
- [dbmate](https://github.com/amacneil/dbmate): データベースマイグレーションツール

### フレームワーク・ライブラリ

- [express](https://expressjs.com): Node.js Web フレームワーク
- [http-errors](https://github.com/jshttp/http-errors): HTTP エラー生成ライブラリ
- [morgan](https://github.com/expressjs/morgan): HTTP リクエストロギングライブラリ
- [pg](https://node-postgres.com/): Node.js 用 PostgreSQL クライアント

## セットアップ

リポジトリから Zip をダウンロードし、PC 上に展開して git 管理を始めてください。

1. 環境変数の設定

   [env.sample](/env.sample) をコピーして、`.env` ファイルを作成します。内容は、必要であれば適宜書き換えてください。

   ```sh
   cp env.sample .env
   ```

2. モジュールのダウンロード

   ```sh
   yarn install
   ```

3. 開発サーバの起動

   ```sh
   yarn dev
   ```

## スクリプト

package.json の `scripts` に、以下のスクリプトが用意されています。

- `yarn dev`: 開発サーバーを起動し、ホットリロードを有効にします。
- `yarn lint`: Biome を使用してコードをチェックします。
- `yarn lint:fix`: コードをチェックし、自動で問題を修正します。
- `yarn format`: Biome を使用してコードをフォーマットします。
- `yarn format:fix`: コードをフォーマットし、自動で問題を修正します。
- `yarn db`: dbmate を使用してデータベースを管理します。
- `yarn db:new`: 新しいデータベースマイグレーションを作成します。
- `yarn db:up`: 必要であればデータベースを作成し、保留中のすべてのマイグレーションを適用します。
- `yarn db:down`: 最後のマイグレーションをロールバックします。
- `yarn test`: テストを実行するためのプレースホルダです。

## フォルダ構成

モジュールごとに責務を分けるため、次のフォルダ構成を参考にファイルを整理してください。

```plaintext
src/
  routes/
    items.ts          # エンドポイントを定義する
  controllers/
    items.ts          # リクエストを受け取りレスポンスを返す
  services/
    items.ts          # 商品にかかわるビジネスロジック
  models/
    items.ts          # items テーブルに関わる処理
  app.ts              # アプリケーション全体の設定やミドルウェアの設定
```

- route: リクエストに応じて controller を呼び出し
- controller: リクエストを受け取り、service を呼び出し、レスポンスを返す
- service: model を利用して「商品一覧データの取得」などの主たる処理を行う
- model: テーブルへのクエリの発行
