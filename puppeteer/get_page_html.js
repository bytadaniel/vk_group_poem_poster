import puppeteer from 'puppeteer'

export async function getPageHtml (url) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })
    const [page] = await browser.pages()

    await page.goto(url, { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close()
    return data
  } catch (err) {
    console.error(err);
  }
}