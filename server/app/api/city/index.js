'use strict';

import {Router} from 'express';
import * as controller from './city.controller';
import * as auth from '../../auth/auth';

const router = new Router();


router.get("/", controller.index);
router.get("/:name", controller.city);
router.post("/", controller.create);


export default router;
