import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const generateContacts = async (number) => {
  try {
    const existingContacts = await readContacts();
    const newContacts = [];
    for (let i = 0; i < number; i++) {
      const newContact = createFakeContact();
      newContacts.push(newContact);
    }
    const contacts = [...existingContacts, ...newContacts];
    await writeContacts(contacts);
  } catch (error) {
    console.error(error);
  }
};

generateContacts(5);
