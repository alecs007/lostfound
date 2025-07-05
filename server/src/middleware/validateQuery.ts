import { RequestHandler } from "express";
import { ZodSchema } from "zod";

export const validateQuery = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      const errors = Object.entries(fieldErrors).map(([field, messages]) => ({
        field,
        message: messages?.[0] || "Invalid value",
      }));
      res.status(400).json({
        code: "VALIDATION_ERROR",
        errors,
      });
      return;
    }

    (req as any).validatedQuery = result.data;

    next();
  };
};
