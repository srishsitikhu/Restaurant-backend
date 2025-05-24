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

        if (!restaurantId || isNaN(Number(restaurantId))) {
            return res.status(400).json({ error: "Invalid or missing restaurantId" });
        }

        const comments = await prisma.comment.findMany({
            where: { restaurantId: parseInt(restaurantId as string, 10) },
        });
        res.status(200).json({ message: "Succesfully getting comment" });

    } catch (error) {
        res.status(500).json({ message: "Failed to get comment" });
    }
}