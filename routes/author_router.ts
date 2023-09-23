import express, { Request, Response } from 'express';
import db from '../models';
import operations from '../api/paths/authors'
import operations2 from '../api/paths/authors/all'
import { accessLevelMiddleware } from '../middlewares/access_level_middleware';
var router = express.Router();


router.get('/all', operations2.GET)
router.get('/:id', operations.GET)
router.post('/create', accessLevelMiddleware, operations.POST)
router.put('/update/:id', accessLevelMiddleware, operations.PUT)
router.delete('/delete/:id', accessLevelMiddleware, operations.DELETE)

export default router;