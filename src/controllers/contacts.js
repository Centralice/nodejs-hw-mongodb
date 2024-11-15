// import { ContactsCollection } from '../db/models/contact.js';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
// import { addContactSchema } from '../validation/contacts.js';
import { parsePaginaionParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginaionParams(req.query);

  const contacts = await getAllContacts({page, perPage});
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId: _id } = req.params;
  const data = await updateContact({ _id, payload: req.body });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId: _id } = req.params;
  const data = await deleteContact({ _id });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
