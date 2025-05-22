import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header("Authorization");
    const secretKey = process.env.SECRET_KEY || ""
    if (!token) {
        res.status(401).json({ error: "Access Denied" })
        return
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        req.userId = (decoded as JwtPayload).userId;
        next();

    } catch (error) {
        res.status(401).json({ error: "Invalid token" })
    }
}

export default verifyToken