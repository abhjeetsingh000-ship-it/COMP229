import express from 'express';
import * as projectsCtrl from '../controllers/projects.js';
import { requireSignin, isAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', projectsCtrl.list);
router.get('/:id', projectsCtrl.getById);
router.post('/', requireSignin, isAdmin, projectsCtrl.create);
router.put('/:id', requireSignin, isAdmin, projectsCtrl.update);
router.delete('/:id', requireSignin, isAdmin, projectsCtrl.remove);
router.delete('/', requireSignin, isAdmin, projectsCtrl.removeAll);

export default router;