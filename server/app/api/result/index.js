'use strict';

import {Router} from 'express';
import * as controller from './result.controller';
import * as auth from '../../auth/auth';

const router = new Router();


router.get("/", auth.isAuthenticated(), controller.index);
router.post("/", auth.isAuthenticated(), controller.create);
router.post("/many", auth.isAuthenticated(), controller.insertMany);
router.put("/:id", auth.isAuthenticated(), controller.update);
router.delete("/:id", auth.isAuthenticated(), controller.destroy);


export default router;
