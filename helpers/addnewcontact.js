const { test, expect } = require('@playwright/test');

// helpers.js
module.exports = {
    addContact
  };

//write a function that generates a random string that I can use as first name, last name, email, street, city, state, postal code, and country.
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

async function addContact(page) {

  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    // Login
    await page.fill('#email', 'george.kurta@emeal.nttdata.com');
    await page.fill('#password', 'Testpass');
    await page.click('#submit');

    // Generate random data for contact details
    const firstName = generateRandomString(8);
    const lastName = generateRandomString(10);
    const email = generateRandomString(5) + '@example.com';

    // Click on the "Add Contact" button
    await page.click('#add-contact');

    // Fill in the contact details
    await page.fill('#firstName', firstName);
    await page.fill('#lastName', lastName);
    await page.fill('#email', email);

    // Click on the "Submit" button
    await page.click('#submit');

    await page.waitForTimeout(1000);

    // Refresh the page
    await page.reload();

    // Wait for the contact table to update
    await page.waitForSelector('.contactTableBodyRow');

    // Get the text content of the contact table
    const contactTableText = await page.textContent('.contactTable');

    // Check if the contact table contains the generated data
    expect(contactTableText).toContain(firstName);
    expect(contactTableText).toContain(lastName);
};
