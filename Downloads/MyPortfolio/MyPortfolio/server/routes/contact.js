import express from 'express';
import * as contactCtrl from '../controllers/contact.js';

const router = express.Router();

router.get('/', contactCtrl.list);
router.get('/:id', contactCtrl.getById);
router.post('/', contactCtrl.create);
router.put('/:id', contactCtrl.update);
router.delete('/:id', contactCtrl.remove);
router.delete('/', contactCtrl.removeAll);

export default router;