# zero-server-tools

ローカルサーバで動作するちょっとしたツール類

👉 Dockerでデプロイ可能に更新 ❗

## Environment

- OS:
    - Windows 10
    - Ubuntu 18.04
- Node.js: 12.14.1
    - Yarn package manager: 1.21.1
        - Install command: `npm install -g yarn`
- Docker: 19.03.5
    - DockerCompose: 1.24.0

### 構成
```bash
./
 |_ node_modules/ # `yarn install` でインストールされる
 |_ app/    # Zero Server のルートディレクトリ（`yarn zero app`）
 |   |_ .zero/    # Zero Server キャッシュ
 |   |_ index.js  # http://localhost:3000
 |
 |_ docker/ # Dockerコンテナ設定
 |   |_ certs/    # letsencryptコンテナが生成するSSL証明書を格納
 |   |_ docker-compose.handlebars # docker-compose.yml のテンプレートファイル
 |
 |_ .babelrc           # Babel 設定ファイル
 |_ Dockerfile         # zeroコンテナ構築ファイル
 |_ docker-compose.yml # Dockerコンテナ構成ファイル
 |_ handledocker.js    # docker-compose.yml 生成スクリプト
 |_ package.json       # node_modules 設定ファイル
```

***

## ローカル開発

```bash
# install: node_modules
$ yarn install

# start: zero server
## npm scripts: "start" => "zero webroot"
##              (webroot/ をルートディレクトリとして Zero Server 起動)
$ yarn start
```

Zero Server が http://localhost:3000 で稼働する

### 備忘録
Zero Server プロジェクト作成

```bash
# initialize project
$ yarn init -y

# install: zero server
$ yarn add zero

# define: npm scripts
$ vim packages.json
### diff
  {
    # ...(略)...
+   "scripts": {
+     "start": "zero app"
+   }
  }
###
```

***

## Dockerによるデプロイ

```bash
# -- user@server

# masterブランチ pull
$ git pull

# docker-compose.yml のファイル変更を無視
$ git update-index --assume-unchanged docker-compose.yml

# 本番公開用の docker-compose.yml 作成
## --host <ドメイン名>: 公開ドメイン名
## --email <メールアドレス>: Let's Encrypt 申請用メールアドレス（省略時: admin@<ドメイン名>）
## +noproxy: 複数のDockerComposeで運用していて nginx-proxy, letsencrypt コンテナが別に定義されている場合に指定
$ node handledocker.js --host yourdomain.com --email yourmail@yourdomain.com +noproxy

# Docker実行ユーザIDを合わせてDockerコンテナビルド
$ export UID && docker-compose build

# コンテナ起動
$ export UID && docker-compose up -d
```
