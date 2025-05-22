import { Request, Response } from "express";
import prisma from "../config/prisma";


export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      name,
      rating,
      cuisineType,
      description,
      address,
      hours,
      imageUrl,
      userId,
      menuItem,
    } = req.body;

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        rating,
        cuisineType,
        description,
        address,
        hours,
        imageUrl,
        userId,
        menuItems: menuItem
          ? {
            create: menuItem.map((item: any) => ({
              name: item.name,
              price: item.price,
              category: item.category,
              description: item.description,
            })),
          }
          : undefined,
      },
    });

    res.status(201).json({ message: "Resturant added succesfully", newRestaurant });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Failed to add restaurant" });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.status(200).json({ message: "Resturant fetch succesfully", restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Resturant added succesfully", restaurant: deletedRestaurant });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Failed to delete restaurant" });
  }
};


export const getResturant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = await prisma.restaurant.findFirst({
      where: { id: parseInt(id) },
      include: {
        menuItems: true
      }
    });

    res.status(200).json({ message: "Resturant fetch succesfully", restaurant });
  } catch (error) {
    console.error("Error retrieving restaurant:", error);
    res.status(500).json({ message: "Failed to retrive restaurant" });
  }
};