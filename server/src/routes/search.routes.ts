import express from "express";
import rateLimit from "express-rate-limit";
import RedisStore, { RedisReply, SendCommandFn } from "rate-limit-redis";
import redis from "../config/redis";
import { searchPosts, getCategories } from "../controllers/searchController";
import { validateQuery } from "../middleware/validateQuery";
import { searchSchema } from "../utils/validators/search.validator";

const sendCommand: SendCommandFn = (commandName, ...args) => {
  return redis.call(commandName, ...args) as Promise<RedisReply>;
};

const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: {
    code: "TOO_MANY_SEARCH_REQUESTS",
    message: "Prea multe cereri de căutare. Încearcă mai târziu.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ sendCommand, prefix: "rl_search:" }),
});

const router = express.Router();

router.get("/", searchLimiter, validateQuery(searchSchema), searchPosts);

router.get("/categories", searchLimiter, getCategories);

export default router;
