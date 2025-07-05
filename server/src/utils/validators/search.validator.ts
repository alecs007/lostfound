import { z } from "zod";

const toNumberOrUndefined = (v: unknown) =>
  v === undefined || v === "" ? undefined : Number(v);

export const searchSchema = z
  .object({
    query: z.string().trim().optional(),
    category: z.string().optional(),

    status: z
      .string()
      .optional()
      .transform((val) =>
        val
          ?.split(",")
          .map((s) => s.trim())
          .filter((s) => ["lost", "found"].includes(s))
      )
      .refine(
        (arr) => arr === undefined || (arr.length > 0 && arr.length < 2),
        { message: "Status trebuie să fie 'lost' sau 'found'" }
      ),

    lat: z.preprocess(
      toNumberOrUndefined,
      z.number().min(-90).max(90).optional()
    ),
    lon: z.preprocess(
      toNumberOrUndefined,
      z.number().min(-180).max(180).optional()
    ),
    radius: z.preprocess(toNumberOrUndefined, z.number().positive().optional()),

    period: z.preprocess(
      toNumberOrUndefined,
      z.number().int().positive().optional()
    ),

    skip: z.preprocess(toNumberOrUndefined, z.number().int().min(0).default(0)),
    limit: z.preprocess(
      toNumberOrUndefined,
      z.number().int().positive().max(50).default(12)
    ),
  })

  .refine(
    ({ lat, lon, radius }) =>
      [lat, lon, radius].every((v) => v === undefined) ||
      [lat, lon, radius].every((v) => v !== undefined),
    {
      message: "Trimite lat, lon și radius împreună",
      path: ["radius"],
    }
  );
