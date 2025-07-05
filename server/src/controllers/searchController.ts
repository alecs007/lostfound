import { Request, Response } from "express";
import Post from "../models/Post";
import { searchSchema } from "../utils/validators/search.validator";
import { z } from "zod";

type SearchQuery = z.infer<typeof searchSchema>;

export async function searchPosts(req: Request, res: Response) {
  try {
    const { query, category, status, lat, lon, radius, period, limit, skip } =
      req.query as unknown as SearchQuery;

    const filters: any = { status: { $ne: "solved" } };

    if (query) filters.$text = { $search: query };

    if (category) filters.category = category;

    if (status) filters.status = { $in: status };

    if (lat !== undefined && lon !== undefined && radius !== undefined) {
      filters.locationCoordinates = {
        $geoWithin: {
          $centerSphere: [[lon, lat], radius / 6378.1],
        },
      };
    }

    if (period !== undefined) {
      const dateThreshold = new Date();
      dateThreshold.setMonth(dateThreshold.getMonth() - period);
      filters.createdAt = { $gte: dateThreshold };
    }

    const promotedPosts = await Post.find({
      ...filters,
      "promoted.isActive": true,
      "promoted.expiresAt": { $gt: new Date() },
    })
      .select(
        "title content images status category location createdAt lostfoundID promoted views lastSeen reward"
      )
      .sort(query ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .lean();

    const promotedIds = promotedPosts.map((p) => p._id);

    const regularPosts = await Post.find({
      ...filters,
      _id: { $nin: promotedIds },
      $or: [
        { "promoted.isActive": { $ne: true } },
        { "promoted.expiresAt": { $lte: new Date() } },
        { promoted: { $exists: false } },
      ],
    })
      .select(
        "title content images status category location createdAt lostfoundID promoted views lastSeen reward"
      )
      .sort(query ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .lean();

    const allPosts = [...promotedPosts, ...regularPosts];
    const paginated = allPosts.slice(skip, skip + limit);

    const totalCount = await Post.countDocuments(filters);

    res.status(200).json({
      code: "SEARCH_RESULTS",
      posts: paginated,
      count: paginated.length,
      totalCount,
      hasMore: skip + paginated.length < totalCount,
      promotedCount: promotedPosts.length,
    });
  } catch (err) {
    console.error("Error searching posts:", err);
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    });
  }
}

export async function getCategories(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const categories = await Post.distinct("category", {
      status: { $ne: "solved" },
    });

    res.status(200).json({
      code: "CATEGORIES_FOUND",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Eroare internă de server",
    });
  }
}
