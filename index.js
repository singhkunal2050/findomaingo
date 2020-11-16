const pup = require('puppeteer')
// import pup from './node_modules/puppeteer'

const express = require('express')

const app = express()
const port = process.env.PORT || 2324

app.get('/', (req, res) => {
  res.send(`<h2> Heyya </h2>`)

})

app.get('/api/:domname', async function (req, res) {
  let result = await getDomainAvailability(req.params.domname)
  res.send('Request for :: ' + req.params.domname + 'Response is :: ' + result )
})

app.listen(port, () => {
  console.log('I was hit!!')
})



async function getDomainAvailability(domain) {
  let url = `https://in.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domain}`
  const browser = await pup.launch()
  try {
    const page = await browser.newPage()
    await page.goto(url)
    // await sleep(3000);
    // getting elem by xpath .. rwturns an array whose first item is stored using destructuring 
    const [elem] = await page.$x('//*[@id="search-app"]/div/div/div[2]/div/div/div/div/div[2]/div[1]/div/span')
    const op = await elem.getProperty('innerText');
    const parsedop = await op.jsonValue();

    if (parsedop.includes('is taken')) {
      console.log('Gone :(');
      return 'Gone';
    } else {
      console.log(`Yayyyyy :} ${url}`);
      return `Yayyyyy :} ${url}`;
    }
    browser.close();
  } catch (e) {
    // console.error(`Exception Occured :: ${e}`)
    console.log('Something Went Wrong!');
    browser.close();
  }
}