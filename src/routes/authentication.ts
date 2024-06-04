import { Router} from "express";

import { verify, signin, singup } from "../controllers/authenticationController";

const router = Router()

router.post("/singup", singup)
router.post("/singin", signin)
router.get("/verify", verify)

export default router