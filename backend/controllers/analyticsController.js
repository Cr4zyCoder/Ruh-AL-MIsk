const Order = require('../models/Order.model');
const Product = require('../models/Product.model');

// @desc    Get store analytics summary
// @route   GET /api/analytics/summary
// @access  Private/Admin
const getAnalyticsSummary = async (req, res) => {
    try {
        const orders = await Order.find({});

        // 1. Core KPIs
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        const totalOrders = orders.length;
        const totalProducts = await Product.countDocuments();

        // 2. Category Distribution
        const categoryData = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        // 3. Top Selling Products
        // This is a simplified version; in a real app, we'd aggregate across all orderItems
        const productStats = {};
        orders.forEach(order => {
            order.orderItems.forEach(item => {
                const name = item.name;
                if (!productStats[name]) {
                    productStats[name] = { name, revenue: 0, sales: 0, image: item.image };
                }
                productStats[name].revenue += item.price * item.quantity;
                productStats[name].sales += item.quantity;
            });
        });

        const topSellers = Object.values(productStats)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        // 4. Sales Trend (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const salesTrend = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: "$totalPrice" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json({
            kpis: {
                totalRevenue,
                totalOrders,
                totalProducts,
                averageOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0
            },
            topSellers,
            categoryData,
            salesTrend
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAnalyticsSummary };
