const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");

let chromeopts = new chrome.Options();
chromeopts.setAcceptInsecureCerts(true);
chromeopts.setBrowserVersion('90');

let firefoxopts = new firefox.Options();
firefoxopts.setAcceptInsecureCerts(true);
firefoxopts.setBrowserVersion('80');

async function africatrip() {

  let driver = new Builder().usingServer("http://35.219.189.235:4444/wd/hub").forBrowser('chrome').setChromeOptions(chromeopts).build();

  try {
    await driver.get("http://35.219.189.235/");

    await driver.manage().window().maximize();

    await driver.findElement(By.className("btn")).click();
    await driver.findElement(By.linkText("DESTINATIONS")).click();
    await driver.findElement(By.name("name")).sendKeys("noumen darryl", Key.RETURN);
    await driver.findElement(By.name("email")).sendKeys("noumendarryl@gmail.com", Key.RETURN);
    await driver.findElement(By.name("reasons")).sendKeys("I want complaint about some UI misfunctions", Key.RETURN);
  }

  finally {
    setInterval(function(){
      driver.close();
    }, 5000);
  }
  
}

africatrip();