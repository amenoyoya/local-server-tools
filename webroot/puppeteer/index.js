import puppeteer from 'puppeteer'
import mime from 'mime'

module.exports = async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://google.com')
  await page.screenshot({path: './screenshot.png'})
  await browser.close()
  res.send('<img src="./screenshot.png">')
}