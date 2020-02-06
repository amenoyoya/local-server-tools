/**
 * puppeteer を永続化して api 駆動させる
 * 参考: https://qiita.com/go_sagawa/items/4a368040fac6f7264e2c
 */
const fs = require('fs');
const puppeteer = require('puppeteer');

// 一つのブラウザをグローバルで利用する
let browser;
// puppeteer再起動用カウンタ
let puppeteerReLaunchCounter = 0;
// puppeteer起動オプション
const puppeteerLaunchOption = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  ignoreHTTPSErrors: true
};

// puppeteer起動関数
const launchPuppeteer = async () => {
  console.log('puppeteerReLaunchCounter: ' + puppeteerReLaunchCounter);
  // puppeteer起動
  browser = await puppeteer.launch(puppeteerLaunchOption);
  console.log(`Puppeteer is running: PID = ${browser.process().pid}, ENDPOINT = ${browser.wsEndpoint()}`);
  browser.on('disconnected', () => {
    console.log('Puppeteer disconnected. Need relaunch.');
  });
};

// puppeteerブラウザのページ取得関数
const getPage = async () => {
  // 再起動が3回を超えたらアプリ終了
  if (puppeteerReLaunchCounter > 3) {
    console.log('Too many times tried launch puppeteer. Abnormal end.');
    process.exit(1);
  }
  // ページ取得
  let page;
  try {
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(5000); // タイムアウト: 5秒
    puppeteerReLaunchCounter = 0; // 再起動カウンタをリセット

    const pages = await browser.pages();
    console.log(`page_count: ${pages.length}`);
    if (pages.length > 5) {
      throw new Error('Too many pages');
    }
  } catch (err) {
    puppeteerReLaunchCounter++;
    console.log(`Cannot create page. Try relaunch... Error: ${err.stack}`);
    // ブラウザ再起動してページ取得
    await browser.close();
    await launchPuppeteer();
    page = await getPage();
  }
  return page;
};

module.exports = {
  launchPuppeteer: launchPuppeteer,
  getPage: getPage
}