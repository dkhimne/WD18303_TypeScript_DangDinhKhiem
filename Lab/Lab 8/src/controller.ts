import { Request, Response } from 'express';
import { User } from './model';

export const getUsers = (req: Request, res: Response) => {
    try {
        let users = [
            new User('Khiem', 'Dinkhim', 'khiem@gmail.com'),
            new User('Dinh', 'DangKhiem', 'khimne@gmail.com'),
            new User('Dang', 'DangKhim', 'khymnua@gmail.com'),
        ];
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createUser = (req: Request, res: Response) => {
    try {
        // Handle user creation logic here
        res.json(req.body);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
