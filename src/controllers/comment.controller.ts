import prisma from "../config/prisma";
import { Response, Request } from 'express';

export const addComment = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            comment,
            rating,
            restaurantId
        } = req.body;
        const newComment = await prisma.comment.create({
            data: {
                userId,
                comment,
                rating,
                restaurantId
            }
        })
        res.status(201).json({ message: "Comment posted succesfully", newComment });
    } catch (error) {
        res.status(500).json({ message: "Failed to post comment" });
    }
}
export const getComments = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.query;

        const condition: any = {};
        if (restaurantId) {
            condition.restaurantId = parseInt(restaurantId as string, 10);
        }

        const comments = await prisma.comment.findMany({
            where: condition,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        res.status(200).json({ message: "Successfully got comments", comments });

    } catch (error) {
        res.status(500).json({ message: "Failed to get comments", error });
    }
};
