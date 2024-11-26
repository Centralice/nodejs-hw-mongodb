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

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userID: userId,
  });
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async ({ _id, payload, userId, options = {} }) => {
  const data = await ContactsCollection.findOneAndUpdate(
    { _id, userId: userId },
    payload,
    {
      ...options,
      new: true,
    },
  );
  return data;
};

export const deleteContact = async ({_id, userId}) => {
  return await ContactsCollection.findOneAndDelete({ _id, userId: userId });
};
