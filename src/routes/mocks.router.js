import { Router } from "express";
const router = Router();

import mocksController from "../controllers/mocks.controller.js";

router.get("/mockingpets", mocksController.getMockingPets);

router.get("/mockingusers", mocksController.getMockingUsers);

// ruta que recibe 2 params numericos (users y pets) y los inserta en DB :
//router.post("/generatedata", mocksController.generateData);

export default router;