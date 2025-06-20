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
import rateLimit from "express-rate-limit";
import RedisStore, { RedisReply, SendCommandFn } from "rate-limit-redis";
import redis from "../config/redis";

const sendCommand: SendCommandFn = (commandName, ...args) => {
  return redis.call(commandName, ...args) as Promise<RedisReply>;
};

const userLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  message: {
    code: "TOO_MANY_REQUESTS",
    error: "Prea multe cereri. Încearcă mai târziu",
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ sendCommand, prefix: "rl_user:" }),
});

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.put(
  "/change-password",
  userLimiter,
  authenticate,
  validate(changePasswordSchema),
  changePassword
);
router.delete(
  "/delete-account",
  userLimiter,
  authenticate,
  validate(deleteAccountSchema),
  deleteAccount
);

export default router;
