module.exports = function () {
  this.When(/^I visit the main page$/, async () => {
    return driver.get(shared.host.siteRoot);
  });

  // Expect one input with name=keyword, enabled, type=text
  this.Then(/^I should see the keyword search box$/, async () => {

    // wait for the page to load
    await driver.wait(until.elementsLocated(by.css('input[name=keyword]')), 10000);
    
    // check one element exists
    input_elements = await driver.findElements(by.css('input[name=keyword]'));
    expect(input_elements.length).to.equal(1)
    
    // check the attributes are correct
    const keyword_box = input_elements[0]

    const type_attribute = await keyword_box.getAttribute('type')
    expect(type_attribute).to.equal('text');

    const disabled_attribute = await keyword_box.getAttribute('disabled')
    expect(disabled_attribute).to.be.null;
  });

  // Expect one input with placeholder="Enter a location", enabled, type=text
  this.Then(/^I should see the location search box$/, async () => {

    // wait for the page to load
    await driver.wait(until.elementsLocated(by.css('input[placeholder="Start typing an address"]')), 10000);

    // check one element exists
    input_elements = await driver.findElements(by.css('input[placeholder="Start typing an address"]'));
    expect(input_elements.length).to.equal(1)

    // check the attributes are correct
    const location_box = input_elements[0]
    
    const type_attribute = await location_box.getAttribute('type')
    expect(type_attribute).to.equal('text');

    const disabled_attribute = await location_box.getAttribute('disabled')
    expect(disabled_attribute).to.be.null;
  });

  // expect more than one category button
  this.Then(/^I should see some category selectors$/, async () => {

    // wait for the page to load
    await driver.wait(until.elementsLocated(by.css('.category__container > .category__button')), 10000);

    // expect there to be more than 1 category button
    categories = await driver.findElements(by.css('.category__container > .category__button'));
    expect(categories.length).to.be.above(1);
  });

    // expect more the search radius selector widget
    this.Then(/^I should see the radius selector$/, async () => {

      // wait for the page to load
      await driver.wait(until.elementsLocated(by.css('form > div.radio-group')), 10000);
  
      // expect there to be 4 radius buttons
      categories = await driver.findElements(by.css('input[name="radius"]'));
      expect(categories.length).to.equal(4);
    });
}