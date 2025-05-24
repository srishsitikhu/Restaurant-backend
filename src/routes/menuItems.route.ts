import { RequestHandler, Router } from 'express'
import { getMenuItems, deleteMenuItem } from '../controllers/menuItems.controller';

const router = Router()

router.get("/", getMenuItems)
router.delete(`/:id`, deleteMenuItem as RequestHandler)

export default router
