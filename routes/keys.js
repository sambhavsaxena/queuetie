import express from "express";
import {create_key, get_keys, delete_key} from "../controllers/keys.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/create").post(auth_middleware, create_key);
router.route("/").get(auth_middleware, get_keys);
router.route("/:id").delete(auth_middleware, delete_key);

export default router;
