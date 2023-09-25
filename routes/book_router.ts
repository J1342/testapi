import express, { Request, Response } from 'express';
import db from '../models';
import operations from '../api/paths/books';
import operations2 from '../api/paths/books/all';
import operations3 from '../api/paths/books/download';
import operationsCreate from '../api/paths/books/create';
import operationsUpdate from '../api/paths/books/update';
import operationsDelete from '../api/paths/books/delete';
import { accessLevelMiddleware } from '../middlewares/access_level_middleware';
var router = express.Router();


router.get('/download', operations3.GET)
router.get('/all', operations2.GET)
router.get('/:id', operations.GET)
router.post('/create', accessLevelMiddleware, operationsCreate.POST)
router.put('/update/:id', accessLevelMiddleware, operationsUpdate.PUT)
router.delete('/delete/:id', accessLevelMiddleware, operationsDelete.DELETE)

export default router;




