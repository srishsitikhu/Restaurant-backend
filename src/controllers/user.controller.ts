import prisma from "../config/prisma";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";



export const userRegisteration = async (req: Request, res: Response) => {
    try {
        const { name, email, avatarUrl, password, confirmPassword, phoneNumber, role } = req.body
        if (password !== confirmPassword) {
            res.status(500).json({ error: "Password do not match" })
            return

        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "Email is already registered" });
            return

        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { name, email, avatarUrl, passwordHash: hashedPassword, phoneNumber, role }
        })
        return res.status(201).json({ message: "User registered successfully", user })
    } catch (error) {
        return res.status(500).json({ error: "Registration failed" })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUsers = await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: "User deleted succesfully", restaurant: deletedUsers });
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ message: "Failed to delete Users" });
    }
  };
export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const secretKey = process.env.SECRET_KEY || "SECRETKEY123"

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(401).json({ error: "Invalid email or password" });
            return
        }

        const matchPassword = await bcrypt.compare(password, user.passwordHash);

        if (!matchPassword) {
            res.status(401).json({ error: "Invalid email or password" });
            return
        }

        const token = jwt.sign({ userId: user.id, name: user.name, role: user.role }, secretKey, {
            expiresIn: '7d',
        });
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const checkEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = await req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(200).json({
                message: "User doesn't exists",
                userExists: false,
            })
            return;
        }
        res.status(200).json({
            message: "User already exists",
            userExists: true,
        })
        return
    } catch (error) {
        res.status(500).json({
            message: "Failed to check Email",
        })
        return
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "Failed to fetch users",
            error,
        });
    }
};