import express from 'express';
import * as qualCtrl from '../controllers/qualifications.js';

const router = express.Router();

router.get('/', qualCtrl.list);
router.get('/:id', qualCtrl.getById);
router.post('/', qualCtrl.create);
router.put('/:id', qualCtrl.update);
router.delete('/:id', qualCtrl.remove);
router.delete('/', qualCtrl.removeAll);

export default router;