import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth_middleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            res.clearCookie("token");
            return res.status(401).json({ error: "Invalid request, token rejected." });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token is not valid." });
    }
};

export default auth_middleware;
