import jwt from "jsonwebtoken";

const create_token = (id, expiry) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: expiry
    });
};

const verify_token = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            status: true,
            message: decoded.id
        };
    } catch (error) {
        return {
            status: false,
            message: "Invalid token: " + error.message
        };
    }
}

export {create_token, verify_token};
