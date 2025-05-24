import { Router } from 'express'
import { getMenuItems } from '../controllers/menuItems.controller'

const router = Router()

router.get("/", getMenuItems)

export default router
