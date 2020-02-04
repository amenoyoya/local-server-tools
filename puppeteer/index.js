/**
 * puppeteer で google.com のスクリーンショットをとり、その結果を返す API サーバ
 */
const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');

// puppeteer でスクレイピングした結果をスクリーンショットに保存
const takeScreenshot = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://google.com')
  await page.screenshot({path: './screenshot.png'})
  await browser.close()
};

// http server
http.createServer(async (req, res) => {
  await takeScreenshot();
  // 保存したスクリーンショットを base64 エンコードして読み込み
  const img = fs.readFileSync('./screenshot.png', 'base64');
  // http response
  res.writeHead(200, {'Content-Type': 'text/html; encode=utf-8'});
  res.end('<img src="data:image/png;base64,' + img + '">');
}).listen(3080, () => console.log(('Serving on http://localhost:3080')));
