import { Request, Response } from "express";
import Post from "../models/Post";
import { searchSchema } from "../utils/validators/search.validator";
import { z } from "zod";

type SearchQuery = z.infer<typeof searchSchema>;

export async function searchPosts(req: Request, res: Response) {
  try {
    const {
      query,
      category,
      status,
      lat,
      lon,
      radius,
      period,
      limit = 12,
      skip = 0,
    } = req.query as unknown as SearchQuery;

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
      const dt = new Date();
      dt.setMonth(dt.getMonth() - period);
      filters.createdAt = { $gte: dt };
    }

    const totalCount = await Post.countDocuments(filters);

    let sort: any;
    let projection =
      "title content images status category location createdAt " +
      "lostfoundID promoted views lastSeen reward";

    if (query) {
      sort = { promoted: -1, score: { $meta: "textScore" } };
      projection += " score"; // allow sorting by score
    } else {
      sort = { promoted: -1, createdAt: -1 };
    }

    let posts = await Post.find(filters)
      .select(projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    if (posts.length === 0 && query) {
      delete filters.$text; // remove text search
      filters.$or = [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ];

      posts = await Post.find(filters)
        .select(projection)
        .sort({ promoted: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    }

    const promotedCount = posts.filter((p) => p.promoted).length;

    res.status(200).json({
      code: "SEARCH_RESULTS",
      posts,
      count: posts.length,
      totalCount,
      hasMore: skip + posts.length < totalCount,
      promotedCount,
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
