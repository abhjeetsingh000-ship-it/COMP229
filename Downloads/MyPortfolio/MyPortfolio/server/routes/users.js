import express from 'express';
import * as userCtrl from '../controllers/users.js';

const router = express.Router();

router.get('/', userCtrl.list);
router.get('/:id', userCtrl.getById);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.remove);
router.delete('/', userCtrl.removeAll);

export default router;