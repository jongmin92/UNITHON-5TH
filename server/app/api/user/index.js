'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth';

const router = new Router();


router.get("/me", auth.isAuthenticated(), controller.me);

router.post("/", controller.create);
router.post("/login", controller.login);
router.post("/image", auth.isAuthenticated(), controller.upload, controller.image);


export default router;
