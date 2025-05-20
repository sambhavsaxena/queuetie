import express from "express";
import { login_user, verify_user, update_user, delete_user } from "../controllers/user.js";
import auth_middleware from "../middlewares/auth.js";

const router = express.Router();

router.route("/login").post(login_user);
router.route("/get").get(auth_middleware, (req, res) => {
  res.status(200).json({ message: "User authenticated", user: req.user });
});
router.route("/verify").post(verify_user);
router.route("/update").put(auth_middleware, update_user);
router.route("/delete").delete(auth_middleware, delete_user);

export default router;
