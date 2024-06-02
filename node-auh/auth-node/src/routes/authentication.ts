import { Router} from "express";

import { verify, signin } from "../controllers/authenticationController";

const router = Router()

router.post("/singin", signin)
router.get("/verify", verify)

export default router