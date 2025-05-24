import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await prisma.menuItem.findMany({
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        res.status(200).json({ message: "Menu Items fetch Sucessfully", menuItems })
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({
            message: "Failed to fetch menu items",
            error,
        });
    }
};