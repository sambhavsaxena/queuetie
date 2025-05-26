import User from "../models/user.js";
import Keys from "../models/keys.js";
import { is_browser_call } from "../utils/request.js"
import jwt from "jsonwebtoken";

const reject_free_user_requests = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: `Unauthorized: Missing or malformed Authorization header`,
            });
        }
        const key = authHeader.split(' ')[1];
        if (!key) {
            return res.status(401).json({
                error: `Unauthorized: Missing key in Authorization header`,
            });
        }
        if (key.startsWith("qt_")) {
            const keys_document = await Keys.findOne({ "keys.key": key });
            if (!keys_document) {
                return res.status(403).json({ error: "Key not found." });
            }
            const user = await User.findById(keys_document.user);
            if (!user) {
                return res.status(403).json({ error: "User not found." });
            }
            if (!is_browser_call && user.subscription === "Free") {
                return res.status(405).json({
                    error: "API access unavailable over your current plan."
                });
            }
            const key_object = keys_document.keys.find((k) => k.key === key);
            if (!key_object) {
                return res.status(403).json({ error: "Invalid key" });
            }
            req.user = user;
            req.keys_document = keys_document;
            next();
        }
        else {
            const decoded = jwt.verify(key, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                res.clearCookie("token");
                return res.status(401).json({ error: "Invalid request, token rejected." });
            }
            if (!is_browser_call && user.subscription === "Free") {
                return res.status(405).json({
                    error: "API access unavailable over your current plan."
                });
            }
            const keys_document = await Keys.findOne({ "user": user._id });
            if (!keys_document) {
                return res.status(403).json({ error: "Key not found." });
            }
            req.user = user;
            req.keys_document = keys_document;
            next();
        }
    } catch (error) {
        return res.status(401).json({ error: "Error resolving API key: " + error });
    }
}

export default reject_free_user_requests;
