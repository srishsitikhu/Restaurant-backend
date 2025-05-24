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
export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedMenuItem = await prisma.menuItem.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: "menuItem deleted succesfully", MenuItem: deletedMenuItem });
    } catch (error) {
        console.error("Error deleting menuItem:", error);
        res.status(500).json({ message: "Failed to delete menuItem" });
    }
  };