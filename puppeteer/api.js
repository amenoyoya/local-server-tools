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
  try {
    
  }
};

module.exports = {

}