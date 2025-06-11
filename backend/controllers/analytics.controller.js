
import Shipment from "../models/shipment.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async (req, res) => {
	try {
		// Get total counts
		const totalShipments = await Shipment.countDocuments();
		const totalUsers = await User.countDocuments();
		
		// Get shipments by status
		const statusStats = await Shipment.aggregate([
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 }
				}
			}
		]);

		// Get revenue data (sum of all shipping costs)
		const revenueData = await Shipment.aggregate([
			{
				$group: {
					_id: null,
					totalRevenue: { $sum: "$shippingCost" }
				}
			}
		]);

		// Get daily shipments data for the last 30 days
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const dailyShipments = await Shipment.aggregate([
			{
				$match: {
					createdAt: { $gte: thirtyDaysAgo }
				}
			},
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
					},
					shipments: { $sum: 1 },
					revenue: { $sum: "$shippingCost" }
				}
			},
			{
				$sort: { "_id": 1 }
			}
		]);

		// Format daily data for chart
		const dailySalesData = dailyShipments.map(item => ({
			name: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			sales: item.shipments,
			revenue: item.revenue
		}));

		// Get pending shipments count
		const pendingShipments = await Shipment.countDocuments({ status: 'pending' });
		const deliveredShipments = await Shipment.countDocuments({ status: 'delivered' });
		const inTransitShipments = await Shipment.countDocuments({ status: 'in_transit' });

		const analyticsData = {
			users: totalUsers,
			products: totalShipments, // Using total shipments as "products"
			totalSales: deliveredShipments,
			totalRevenue: revenueData[0]?.totalRevenue || 0,
			pendingShipments,
			inTransitShipments,
			statusBreakdown: statusStats.reduce((acc, stat) => {
				acc[stat._id] = stat.count;
				return acc;
			}, {})
		};

		res.json({
			analyticsData,
			dailySalesData
		});
	} catch (error) {
		console.log("Error in getAnalyticsData controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getShipmentStatistics = async (req, res) => {
	try {
		// Get service type distribution
		const serviceTypeStats = await Shipment.aggregate([
			{
				$group: {
					_id: "$serviceType",
					count: { $sum: 1 },
					totalRevenue: { $sum: "$shippingCost" }
				}
			}
		]);

		// Get priority distribution
		const priorityStats = await Shipment.aggregate([
			{
				$group: {
					_id: "$priority",
					count: { $sum: 1 }
				}
			}
		]);

		// Get monthly trends for the last 12 months
		const twelveMonthsAgo = new Date();
		twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

		const monthlyTrends = await Shipment.aggregate([
			{
				$match: {
					createdAt: { $gte: twelveMonthsAgo }
				}
			},
			{
				$group: {
					_id: {
						year: { $year: "$createdAt" },
						month: { $month: "$createdAt" }
					},
					shipments: { $sum: 1 },
					revenue: { $sum: "$shippingCost" }
				}
			},
			{
				$sort: { "_id.year": 1, "_id.month": 1 }
			}
		]);

		res.json({
			serviceTypeStats,
			priorityStats,
			monthlyTrends
		});
	} catch (error) {
		console.log("Error in getShipmentStatistics controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
