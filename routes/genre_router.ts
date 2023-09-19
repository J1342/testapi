import express, { Request, Response } from 'express';
import db from '../models';
import operations from '../api/paths/genres'
import operations_2 from '../api/paths/genres/all'
var router = express.Router();


router.get('/all', operations_2.GET)
router.get('/:id', operations.GET)

export default router;