import { Router } from 'express'
import { checkEmail, getUsers } from '../controllers/user.controller'

const router = Router()

router.post("/checkEmail", checkEmail)
router.get("/", getUsers)

export default router
