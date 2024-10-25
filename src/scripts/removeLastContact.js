import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  const contacts = await readContacts();
  // if (contacts.length) {
  //   contacts.length = contacts.length - 1;
  //   await writeContacts(contacts);
  // }
  contacts.pop();
  await writeContacts(contacts);
};

removeLastContact();
