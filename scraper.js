const pup = require('puppeteer')

async function getDomainAvailability(domain){
  let url = `https://in.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${domain}`
  const browser = await pup.launch()
  try{
    const page = await browser.newPage()
    await page.goto(url)
    // await sleep(3000);
    // getting elem by xpath .. rwturns an array whose first item is stored using destructuring 
    const [elem] = await page.$x('//*[@id="search-app"]/div/div/div[2]/div/div/div/div/div[2]/div[1]/div/span')
    const op = await elem.getProperty('innerText');
    const parsedop = await op.jsonValue();
    
    if(parsedop.includes('is taken'))
      console.log('Gone :(');
    else
      console.log(`Yayyyyy :} ${url}`);
    browser.close();
  }catch(e){
    // console.error(`Exception Occured :: ${e}`)
    console.log('Something Went Wrong!');
    browser.close();
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


document.querySelector('.search').addEventListener('click' , () => {
  var domain = document.querySelector('.domain-name').value
  if(domain==='')
    alert('wtf')
  else{
    getDomainAvailability(domain);
  } 
})
