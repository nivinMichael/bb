import express from 'express';
import {  deleteContactById, getContactById, getContacts, newContact, updateContactById } from '../controllers/contactsController.js';
import { isAuthenticateUser } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/auth.js';
const router = express.Router();

router.route('/admin/contacts').get(isAuthenticateUser,authorizeRoles("admin"),getContacts);
router.route('/contacts/create').post(newContact);
router.route('/contacts/:id').get(getContactById);
router.route('/admin/contacts/:id').put(isAuthenticateUser, authorizeRoles("admin"), updateContactById);
router.route('/admin/contacts/:id').delete(isAuthenticateUser, authorizeRoles("admin"), deleteContactById);

export default router;
