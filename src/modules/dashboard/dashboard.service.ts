import { connectDB } from "../../config/db.js";

const USER_LIBRARY = "user_libraries";
const REVIEWS = "reviews";
const BOOKS = "books";

export const DashboardService = {
  getUserDashboard: async (userId: string) => {
    const db = await connectDB();

    /* ---------------- STATS ---------------- */

    const [booksRead, booksReading] = await Promise.all([
      db.collection(USER_LIBRARY).countDocuments({
        userId,
        status: "read",
      }),
      db.collection(USER_LIBRARY).countDocuments({
        userId,
        status: "reading",
      }),
    ]);

    const avgRatingAgg = await db
      .collection(REVIEWS)
      .aggregate([
        { $match: { userId, status: "approved" } },
        { $group: { _id: null, avg: { $avg: "$rating" } } },
      ])
      .toArray();

    const avgRating = avgRatingAgg[0]?.avg || 0;

    /* ---------------- READING TRENDS (LAST 7 DAYS) ---------------- */

    const trends = await db
      .collection(USER_LIBRARY)
      .aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: {
              day: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$updatedAt",
                },
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.day": 1 } },
        { $limit: 7 },
      ])
      .toArray();

    const readingTrends = trends.map((t) => ({
      day: t._id.day,
      books: t.count,
    }));

    /* ---------------- RECENT BOOKS ---------------- */

    const recentBooks = await db
      .collection(USER_LIBRARY)
      .aggregate([
        { $match: { userId } },
        { $sort: { updatedAt: -1 } },
        { $limit: 3 },
        {
          $addFields: {
            bookObjectId: { $toObjectId: "$bookId" },
          },
        },
        {
          $lookup: {
            from: BOOKS,
            localField: "bookObjectId",
            foreignField: "_id",
            as: "book",
          },
        },
        { $unwind: "$book" },
        {
          $project: {
            title: "$book.title",
            author: "$book.author",
            coverImage: "$book.coverImage",
            status: 1,
            progress: 1,
          },
        },
      ])
      .toArray();

    /* ---------------- TOP GENRES ---------------- */

    const topGenres = await db
      .collection(USER_LIBRARY)
      .aggregate([
        { $match: { userId } },
        {
          $addFields: {
            bookObjectId: { $toObjectId: "$bookId" },
          },
        },
        {
          $lookup: {
            from: BOOKS,
            localField: "bookObjectId",
            foreignField: "_id",
            as: "book",
          },
        },
        { $unwind: "$book" },
        { $unwind: "$book.genres" },
        {
          $group: {
            _id: "$book.genres",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
          $project: {
            genre: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ])
      .toArray();

    return {
      stats: {
        booksRead,
        booksReading,
        avgRating: Number(avgRating.toFixed(1)),
      },
      readingTrends,
      recentBooks,
      topGenres,
    };
  },
};
