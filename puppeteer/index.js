/**
 * http サーバ
 */
const http = require('http');
const fs = require('fs');
const api = require('./api');

// puppetter起動
api.launchPuppeteer();

http.createServer(async (req, res) => {
  // puppeteerページ取得
  const page = await api.getPage();
  // Navigation & Screenshot
  await page.goto('https://www.google.co.jp');
  await page.screenshot({
    path: 'screenshot.png',
    fullPage: true
  });
  const base64 = fs.readFileSync('screenshot.png', 'base64');
  // スクリーンショットを表示
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`<img src="data:image/png;base64,${base64}">`);
})
  // localhost:3000 で稼働
  .listen(3080, '127.0.0.1', () => console.log('Serving on http://localhost:3080 ...'))