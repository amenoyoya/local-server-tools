# local-server-tools

ローカルサーバで動作するちょっとしたツール類

## Environment

- OS:
    - Windows 10
    - Ubuntu 18.04
- Node.js: 12.14.1
    - Yarn package manager: 1.21.1
        - Install command: `npm install -g yarn`

***

## Setup

```bash
# install: node_modules
$ yarn install

# start: zero server
## npm scripts: "start" => "zero webroot"
##              (webroot/ をルートディレクトリとして Zero Server 起動)
$ yarn start
```

Zero Server が http://localhost:3000 で稼働する

***

## 備忘録

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
+     "start": "zero webroot"
+   }
  }
###
```

### 構成
```bash
./
 |_ node_modules/ # `yarn install` でインストールされる
 |_ webroot/ # Zero Server のルートディレクトリ（`yarn zero webroot`）
 |   |_ .zero/   # Zero Server キャッシュ
 |   |_ index.js # http://localhost:3000
 |_ .babelrc # Babel 設定ファイル
 |_ package.json # node_modules 設定ファイル
```
