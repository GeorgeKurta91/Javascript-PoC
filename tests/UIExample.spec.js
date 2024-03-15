const { test, expect } = require('@playwright/test');
const { addContact } = require('../helpers/addnewcontact.js');

test('Add contact', async ({ page }) => {
    await addContact(page);
});
