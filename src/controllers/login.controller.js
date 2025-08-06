import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"

const loginAdmin  = asyncHandler ( (req, res) => {
    const { username, password } = req.body;

    console.log(`Login attempt with username: ${username}`);

    const isAdminUser = username === process.env.ADMIN_USERNAME;
    const isAdminPass = password === process.env.ADMIN_PASSWORD;

    if (isAdminUser && isAdminPass) {
        console.log('Admin login successful.');

        const payload = {
            user: {
                id: 'admin_user_01',
                role: 'admin'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } 
    else {
        console.log('Admin login failed: Invalid credentials.');
        res.status(400).json({ error: 'Invalid Credentials' });
    }
})

export { loginAdmin }