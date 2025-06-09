import express from "express";
import { authenticate } from "../middleware/authenticate";
import {
  getProfile,
  changePassword,
  deleteAccount,
} from "../controllers/userController";
import { validate } from "../middleware/validate";
import {
  changePasswordSchema,
  deleteAccountSchema,
} from "../utils/validators/auth.validator";

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.put(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePassword
);
router.delete(
  "/delete-account",
  authenticate,
  validate(deleteAccountSchema),
  deleteAccount
);

export default router;
