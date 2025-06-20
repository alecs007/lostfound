import express from "express";
import {
  login,
  logout,
  register,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import { validate } from "../middleware/validate";
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  emailSchema,
} from "../utils/validators/auth.validator";
import rateLimit from "express-rate-limit";
import RedisStore, { RedisReply, SendCommandFn } from "rate-limit-redis";
import redis from "../config/redis";

const sendCommand: SendCommandFn = (commandName, ...args) => {
  return redis.call(commandName, ...args) as Promise<RedisReply>;
};

const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    code: "TOO_MANY_REGISTRATION_ATTEMPTS",
    error: "Prea multe încercări de înregistrare. Încearcă mai târziu.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ sendCommand, prefix: "rl_register:" }),
});

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: {
    code: "TOO_MANY_LOGIN_ATTEMPTS",
    error: "Prea multe încercări de autentificare. Încearcă mai târziu.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ sendCommand, prefix: "rl_login:" }),
});

const authGeneralLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    code: "TOO_MANY_REQUESTS",
    error: "Prea multe cereri. Încearcă mai târziu.",
  },
  store: new RedisStore({ sendCommand, prefix: "rl_auth_general:" }),
});

const router = express.Router();

router.post("/register", registerLimiter, validate(registerSchema), register);
router.post("/login", loginLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/verify-email", verifyEmail);
router.post(
  "/forgot-password",
  authGeneralLimiter,
  validate(emailSchema),
  forgotPassword
);
router.post(
  "/reset-password",
  authGeneralLimiter,
  validate(resetPasswordSchema),
  resetPassword
);

export default router;
