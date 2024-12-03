import { Router } from 'express';
import * as contactControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  addContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.getContactByIdController),
);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(addContactSchema),
  ctrlWrapper(contactControllers.addContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(contactControllers.updateContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;
