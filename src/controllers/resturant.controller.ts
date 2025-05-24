import { Request, Response } from "express";
import prisma from "../config/prisma";

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      name,
      rating,
      cuisineType,
      description,
      location,
      hours,
      imageUrl,
      userId,
      menuItems,
    } = req.body;

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        rating,
        cuisineType,
        description,
        location,
        hours,
        imageUrl,
        userId,
        menuItems: menuItems
          ? {
            create: menuItems.map((item: any) => ({
              name: item.name,
              price: Number(item.price),
              description: item.description,
              imageUrl: imageUrl
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

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      name,
      rating,
      cuisineType,
      description,
      location,
      hours,
      imageUrl,
      menuItems,
    } = req.body;

    const { id } = req.params;

    // Update the restaurant data
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: {
        name,
        rating,
        cuisineType,
        description,
        location,
        hours,
        imageUrl,
        menuItems: menuItems
          ? {
            deleteMany: {},
            create: menuItems.map((item: any) => ({
              name: item.name,
              price: Number(item.price),
              description: item.description,
              imageUrl: imageUrl
            })),
          }
          : undefined,
      },
      include: {
        menuItems: true,
      },
    });

    res.status(200).json({ message: "Restaurant updated successfully", updatedRestaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Failed to update restaurant" });
  }
};


interface RestaurantQuery {
  search?: string;
  cuisineType?: string;
  location?: string;
  page?: string;
  pageSize?: string;
}

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { search, cuisineType, location, page, pageSize } = req.query as RestaurantQuery;

    const condition: any = {};

    if (search) {
      condition.name= search
    }

    if (cuisineType) {
      condition.cuisineType = cuisineType;
    }

    if (location) {
      condition.location = location;
    }

    const pageNumber = parseInt(page || "1");
    const size = parseInt(pageSize || "10");

    const restaurants = await prisma.restaurant.findMany({
      where: condition,
      skip: (pageNumber - 1) * size,
      take: size,
      orderBy: {createdAt: "desc"}
    });

    res.status(200).json({ message: "Restaurants fetched successfully", restaurants });
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

    res.status(200).json({ message: "Resturant deleted succesfully", restaurant: deletedRestaurant });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Failed to delete restaurant" });
  }
};


export const getResturant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurantId = parseInt(id);

    if (isNaN(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        menuItems: true,
      },
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant fetched successfully", restaurant });
  } catch (error) {
    console.error("Error retrieving restaurant:", error);
    res.status(500).json({ message: "Failed to retrieve restaurant" });
  }
};
