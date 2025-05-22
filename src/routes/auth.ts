import { RequestHandler, Router } from 'express'
import { userLogin, userRegisteration } from '../controllers/user.controller'

const router = Router()

router.post("/register", userRegisteration as RequestHandler)
router.post("/login", userLogin as RequestHandler)

export default router
