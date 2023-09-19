import express, { Request, Response } from 'express';
import db from '../models';
import operations from '../api/paths/authors'
import operations2 from '../api/paths/authors/all'
var router = express.Router();


router.get('/all', operations2.GET)
router.get('/:id', operations.GET)
router.post('/create', operations.POST)
router.put('/update/:id', operations.PUT)
router.delete('/delete/:id', operations.DELETE)

export default router;