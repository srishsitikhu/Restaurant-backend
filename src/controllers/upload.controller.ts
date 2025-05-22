import { Request, Response } from 'express';
import path from 'path';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.file;

        const relativePath = path.relative(process.cwd(), file.path);
        let filePath = relativePath.replace(/^src[\\/]/, '');

        res.status(200).json({
            message: 'File uploaded successfully',
            file: {
                originalname: file.originalname,
                filename: file.filename,
                path: "/" + filePath.replace(/\\/g, '/'),             },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "File upload failed", error });
    }
};
