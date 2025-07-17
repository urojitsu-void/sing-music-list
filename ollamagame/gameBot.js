const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://example.com/game');

    // ゲームの操作例
    await page.click('#start-button');

    for (let i = 0; i < 10; i++) {
        await page.click('.action-button');
        await page.waitForTimeout(1000);
    }

    await browser.close();
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
