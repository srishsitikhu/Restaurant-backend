import { RequestHandler, Router } from 'express'
import { checkEmail, deleteUser, getUsers } from '../controllers/user.controller'

const router = Router()

router.post("/checkEmail", checkEmail)
router.get("/", getUsers)
router.delete("/:id",deleteUser as RequestHandler)

export default router
