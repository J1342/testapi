import express, { Request, Response } from 'express';
import db from '../models';
import operations from '../api/paths/books';
import operations2 from '../api/paths/books/all';
import operations3 from '../api/paths/books/download'
import { accessLevelMiddleware } from '../middlewares/access_level_middleware';
var router = express.Router();


router.get('/download', operations3.GET)
router.get('/all', operations2.GET)
router.get('/:id', operations.GET)
router.post('/create', accessLevelMiddleware, operations.POST)
router.put('/update/:id', accessLevelMiddleware, operations.PUT)
router.delete('/delete/:id', accessLevelMiddleware, operations.DELETE)

export default router;




