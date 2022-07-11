const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
require("geckodriver");

async function africatrip() {
  // let chromedriver = await new Builder().forBrowser("chrome").build();
  let firefoxdriver = await new Builder().forBrowser("firefox").build();
  // let driver = new Builder().usingServer("http://35.219.189.235:4444/wd/hub").forBrowser("firefox").build();

  await firefoxdriver.get("http://35.219.189.235/");

  await firefoxdriver.manage().window().maximize();

  await firefoxdriver.findElement(By.className("btn")).click();
  await firefoxdriver.findElement(By.linkText("DESTINATIONS")).click();
  await firefoxdriver.findElement(By.name("name")).sendKeys("noumen darryl", Key.RETURN);
  await firefoxdriver.findElement(By.name("email")).sendKeys("noumendarryl@gmail.com", Key.RETURN);
  await firefoxdriver.findElement(By.name("reasons")).sendKeys("I want complaint about some UI misfunctions", Key.RETURN);

  setInterval(function(){
    firefoxdriver.close();
  }, 5000);
}

africatrip();