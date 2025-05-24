import prisma from "../config/prisma";
import { Response, Request } from 'express';

// Add a new contact message
export const addContact = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        res.status(201).json({ message: "Contact message sent successfully", newContact });
    } catch (error) {
        res.status(500).json({ message: "Failed to send contact message", error });
    }
};

// Get all contact messages (optionally can add filters if needed)
export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await prisma.contact.findMany();

        res.status(200).json({ message: "Successfully fetched contacts", contacts });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch contacts", error });
    }
};
