import { generateContacts } from '../scripts/generateContacts.js';

export const addOneContact = async () => {
  await generateContacts(1);
};

addOneContact();
