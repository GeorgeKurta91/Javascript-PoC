import { test, expect } from '@playwright/test';

test("Add and Retrieve Contact", async ({ request }) => {
    // Login data
    const loginData = {
        "email": "george.kurta@emeal.nttdata.com",
        "password": "Testpass"
    };

    // Log in to obtain the authentication token
    const loginResponse = await request.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
        headers: { 'Content-Type': 'application/json' },
        data: loginData
    });

    expect(loginResponse.status()).toBe(200);
    expect(loginResponse.ok()).toBeTruthy();

    // Extract the token from the login response
    const responseBody = await loginResponse.json();
    const token = responseBody.token;

    expect(token).toBeTruthy(); // Ensure token is not empty

    // Contact data to be added
    const contactData = {
        "firstName": "George",
        "lastName": "Test",
        "birthdate": "1970-01-01",
        "email": "jdoe@fake.com",
        "phone": "8005555555",
        "street1": "1 Main St.",
        "street2": "Apartment A",
        "city": "Anytown",
        "stateProvince": "KS",
        "postalCode": "12345",
        "country": "USA"
    };

    // Add a new contact using the authentication token
    const addContactResponse = await request.post('https://thinking-tester-contact-list.herokuapp.com/contacts', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: contactData
    });

    expect(addContactResponse.status()).toBe(201);
    expect(addContactResponse.ok()).toBeTruthy();

    // Retrieve contacts using the authentication token
    const getContactsResponse = await request.get('https://thinking-tester-contact-list.herokuapp.com/contacts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    expect(getContactsResponse.status()).toBe(200);
    expect(getContactsResponse.ok()).toBeTruthy();

    // Extract the contacts from the response
    const contacts = await getContactsResponse.json();

    // Verify that the added contact is present in the response
    const addedContact = contacts.find(contact => contact.firstName === "George" && contact.lastName === "Test");
    expect(addedContact).toBeTruthy();
});
