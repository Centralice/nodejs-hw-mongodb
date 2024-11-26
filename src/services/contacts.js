import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter,
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactsCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  if (filter.userId) {
    query.where('userId').equals(filter.userId);
  }

  const contacts = await query;

  const totalItems = await ContactsCollection.find()
    .merge(query)
    .countDocuments();
  const paginationData = calculatePaginationData({ totalItems, page, perPage });
  return { contacts, ...paginationData };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async ({ _id, payload, options = {} }) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
  });
  return data;
};

export const deleteContact = async (filter) => {
  return await ContactsCollection.findOneAndDelete(filter);
};
