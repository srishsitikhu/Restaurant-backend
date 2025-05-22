import express, { Router } from "express"

import verifyToken from "../middleware/authMiddleware"

const router = Router()

router.get("/", verifyToken, (req, res) => {
    res.status(200).json("Protected route accessed")
})

export default router