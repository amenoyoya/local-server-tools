/**
 * http サーバ
 */
const http = require('http');
const api = require('./api');

http.createServer((req, res) => {
  // puppeteerページ取得
  const page = api.getPage();
})
  // localhost:3000 で稼働
  .listen(3080, '127.0.0.1', () => console.log('Serving on http://localhost:3080 ...'))