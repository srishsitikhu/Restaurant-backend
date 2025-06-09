import { RequestHandler, Router } from "express";
import { addContact, getContacts } from "../controllers/contact.controller";

const router = Router()

router.post("/",addContact as RequestHandler)
router.get("/",getContacts as RequestHandler)

export default router