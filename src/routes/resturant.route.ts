import { RequestHandler, Router } from "express";
import { getRestaurants, addRestaurant, deleteRestaurant } from "../controllers/resturant.controller";

const router = Router()
router.post("/", getRestaurants as RequestHandler)
router.get("/", getRestaurants as RequestHandler)
router.delete("/:id", deleteRestaurant as RequestHandler)
router.get("/:id", getRestaurants as RequestHandler)


export default router