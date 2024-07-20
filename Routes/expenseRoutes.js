import express from 'express';
import {addExpense} from '../Controllers/ExpenseController.js';

const router = express.Router();

router.route('/addExpense').post(addExpense);

export default router;
