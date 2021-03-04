var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://www.amazon.com/');
driver.findElement(By.linkText('Sign in')).click();
driver.findElement(By.id('ap_email')).sendKeys(process.env.thehubscu);
driver.findElement(By.id('ap_password')).sendKeys(process.env.hunt4ech1klefHANK);
driver.findElement(By.id('signInSubmit')).click();
driver.findElement(By.linkText('Gift Cards')).click();
driver.findElement(By.linkText('Amazon.com Gift Cards - E-mail Delivery')).click();
driver.findElement(By.id('gc-order-form-custom-amount')).sendKeys('0.5');
driver.findElement(By.id('gc-order-form-recipients')).sendKeys(process.env.thehubscu);
driver.findElement(By.id('gc-order-form-senderName')).sendKeys(process.env.hunt4ech1klefHANK);
driver.findElement(By.id('gc-mini-cart-proceed-to-checkout')).click();
driver.findElement(By.id('payment-change-link')).click();
driver.wait(until.titleIs('Select a Payment Method - Amazon.com Checkout'), 3000);
driver.findElement(By.xpath("//strong[contains(text(), 'Debit Card')]")).click();
driver.findElement(By.id('continue-top')).click();
driver.wait(until.titleIs('Place Your Order - Amazon.com Checkout'), 3000);
driver.findElement(By.xpath("//input[@name='placeYourOrder1']")).click();
driver.quit();
