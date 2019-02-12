module.exports = function() {
  this.Then(/^the URL "(\w+)" should be "([^"]+)"$/, async (attribute, value) => {
    const url = new URL(await driver.getCurrentUrl());
    expect(url[attribute]).to.equal(value);
  });
}