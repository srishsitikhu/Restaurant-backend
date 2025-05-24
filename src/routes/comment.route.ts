import { RequestHandler, Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller";

const router = Router()

router.post("/",addComment as RequestHandler)
router.get("/",getComments as RequestHandler)

export default router