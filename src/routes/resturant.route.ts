import { RequestHandler, Router } from "express";
import { getRestaurants, getResturant, addRestaurant, deleteRestaurant, updateRestaurant } from "../controllers/resturant.controller";

const router = Router()

router.get("/", getRestaurants as RequestHandler)
router.post("/", addRestaurant as RequestHandler)
router.delete("/:id", deleteRestaurant as RequestHandler)
router.get("/:id", getResturant as RequestHandler)
router.patch("/:id", updateRestaurant as RequestHandler)


export default router