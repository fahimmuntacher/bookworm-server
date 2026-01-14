import { connectDB } from "../../config/db";

export const AdminDashboardService = {
  getOverview: async () => {
    const db = await connectDB();

    /* ---------------- STATS ---------------- */
    const [totalBooks, totalUsers, pendingReviews, totalTutorials] =
      await Promise.all([
        db.collection("books").countDocuments(),
        db.collection("user").countDocuments(),
        db.collection("reviews").countDocuments({ status: "pending" }),
        db.collection("tutorials").countDocuments(),
      ]);

    /* ---------------- MONTHLY TRENDS ---------------- */
    const monthlyBooks = await db
      .collection("books")
      .aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const monthlyUsers = await db
      .collection("user")
      .aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const monthMap = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyTrends = monthMap.map((m, i) => ({
      month: m,
      books: monthlyBooks.find((b) => b._id === i + 1)?.count || 0,
      users: monthlyUsers.find((u) => u._id === i + 1)?.count || 0,
    }));

    /* ---------------- PENDING REVIEWS (FIXED) ---------------- */
    const pendingReviewList = await db
      .collection("reviews")
      .aggregate([
        { $match: { status: "pending" } },

        // ✅ Convert string IDs → ObjectId
        {
          $addFields: {
            bookObjectId: { $toObjectId: "$bookId" },
            userObjectId: { $toObjectId: "$userId" },
          },
        },

        {
          $lookup: {
            from: "books",
            localField: "bookObjectId",
            foreignField: "_id",
            as: "book",
          },
        },
        {
          $lookup: {
            from: "user",
            localField: "userObjectId",
            foreignField: "_id",
            as: "user",
          },
        },

        { $unwind: "$book" },
        { $unwind: "$user" },

        {
          $project: {
            rating: 1,
            comment: 1,
            createdAt: 1,
            bookTitle: "$book.title",
            userName: "$user.name",
          },
        },

        { $sort: { createdAt: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    return {
      stats: {
        totalBooks,
        totalUsers,
        pendingReviews,
        totalTutorials,
      },
      monthlyTrends,
      pendingReviews: pendingReviewList,
    };
  },
};
