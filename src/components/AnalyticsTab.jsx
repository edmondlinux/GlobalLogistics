
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, Truck, DollarSign, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
		pendingShipments: 0,
		inTransitShipments: 0,
		statusBreakdown: {}
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);
	const [statistics, setStatistics] = useState({
		serviceTypeStats: [],
		priorityStats: [],
		monthlyTrends: []
	});

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const [analyticsResponse, statisticsResponse] = await Promise.all([
					axios.get("/analytics"),
					axios.get("/analytics/statistics")
				]);
				
				setAnalyticsData(analyticsResponse.data.analyticsData);
				setDailySalesData(analyticsResponse.data.dailySalesData);
				setStatistics(statisticsResponse.data);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
			</div>
		);
	}

	// Colors for pie chart
	const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

	// Format status breakdown for pie chart
	const statusChartData = Object.entries(analyticsData.statusBreakdown).map(([status, count]) => ({
		name: status.replace('_', ' ').toUpperCase(),
		value: count
	}));

	// Format monthly trends data
	const monthlyTrendsData = statistics.monthlyTrends.map(item => ({
		name: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
		shipments: item.shipments,
		revenue: item.revenue
	}));

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			{/* Key Metrics Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<AnalyticsCard
					title='Total Users'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color='from-emerald-500 to-teal-700'
				/>
				<AnalyticsCard
					title='Total Shipments'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color='from-emerald-500 to-green-700'
				/>
				<AnalyticsCard
					title='Delivered Shipments'
					value={analyticsData.totalSales.toLocaleString()}
					icon={CheckCircle}
					color='from-emerald-500 to-cyan-700'
				/>
				<AnalyticsCard
					title='Total Revenue'
					value={`$${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
					color='from-emerald-500 to-lime-700'
				/>
			</div>

			{/* Secondary Metrics Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
				<AnalyticsCard
					title='Pending Shipments'
					value={analyticsData.pendingShipments.toLocaleString()}
					icon={Clock}
					color='from-yellow-500 to-orange-700'
				/>
				<AnalyticsCard
					title='In Transit'
					value={analyticsData.inTransitShipments.toLocaleString()}
					icon={Truck}
					color='from-blue-500 to-indigo-700'
				/>
				<AnalyticsCard
					title='Average Revenue per Shipment'
					value={`$${analyticsData.products > 0 ? (analyticsData.totalRevenue / analyticsData.products).toFixed(2) : '0.00'}`}
					icon={TrendingUp}
					color='from-purple-500 to-pink-700'
				/>
			</div>

			{/* Charts Section */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
				{/* Daily Shipments and Revenue Chart */}
				<motion.div
					className='bg-gray-800/60 rounded-lg p-6 shadow-lg'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.25 }}
				>
					<h3 className='text-xl font-semibold text-emerald-400 mb-4'>Daily Shipments & Revenue (Last 30 Days)</h3>
					<ResponsiveContainer width='100%' height={300}>
						<LineChart data={dailySalesData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' stroke='#D1D5DB' />
							<YAxis yAxisId='left' stroke='#D1D5DB' />
							<YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
							<Tooltip />
							<Legend />
							<Line
								yAxisId='left'
								type='monotone'
								dataKey='sales'
								stroke='#10B981'
								activeDot={{ r: 8 }}
								name='Shipments'
							/>
							<Line
								yAxisId='right'
								type='monotone'
								dataKey='revenue'
								stroke='#3B82F6'
								activeDot={{ r: 8 }}
								name='Revenue ($)'
							/>
						</LineChart>
					</ResponsiveContainer>
				</motion.div>

				{/* Shipment Status Distribution */}
				<motion.div
					className='bg-gray-800/60 rounded-lg p-6 shadow-lg'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<h3 className='text-xl font-semibold text-emerald-400 mb-4'>Shipment Status Distribution</h3>
					<ResponsiveContainer width='100%' height={300}>
						<PieChart>
							<Pie
								data={statusChartData}
								cx='50%'
								cy='50%'
								labelLine={false}
								label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
								outerRadius={80}
								fill='#8884d8'
								dataKey='value'
							>
								{statusChartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</motion.div>
			</div>

			{/* Service Type Revenue Chart */}
			{statistics.serviceTypeStats.length > 0 && (
				<motion.div
					className='bg-gray-800/60 rounded-lg p-6 shadow-lg mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.35 }}
				>
					<h3 className='text-xl font-semibold text-emerald-400 mb-4'>Revenue by Service Type</h3>
					<ResponsiveContainer width='100%' height={300}>
						<BarChart data={statistics.serviceTypeStats}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='_id' stroke='#D1D5DB' />
							<YAxis stroke='#D1D5DB' />
							<Tooltip />
							<Legend />
							<Bar dataKey='totalRevenue' fill='#10B981' name='Revenue ($)' />
							<Bar dataKey='count' fill='#3B82F6' name='Shipment Count' />
						</BarChart>
					</ResponsiveContainer>
				</motion.div>
			)}

			{/* Monthly Trends Chart */}
			{monthlyTrendsData.length > 0 && (
				<motion.div
					className='bg-gray-800/60 rounded-lg p-6 shadow-lg'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-emerald-400 mb-4'>Monthly Trends (Last 12 Months)</h3>
					<ResponsiveContainer width='100%' height={400}>
						<LineChart data={monthlyTrendsData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' stroke='#D1D5DB' />
							<YAxis yAxisId='left' stroke='#D1D5DB' />
							<YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
							<Tooltip />
							<Legend />
							<Line
								yAxisId='left'
								type='monotone'
								dataKey='shipments'
								stroke='#10B981'
								activeDot={{ r: 8 }}
								name='Monthly Shipments'
							/>
							<Line
								yAxisId='right'
								type='monotone'
								dataKey='revenue'
								stroke='#3B82F6'
								activeDot={{ r: 8 }}
								name='Monthly Revenue ($)'
							/>
						</LineChart>
					</ResponsiveContainer>
				</motion.div>
			)}
		</div>
	);
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<motion.div
		className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex justify-between items-center'>
			<div className='z-10'>
				<p className='text-emerald-300 text-sm mb-1 font-semibold'>{title}</p>
				<h3 className='text-white text-3xl font-bold'>{value}</h3>
			</div>
		</div>
		<div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`} />
		<div className='absolute -bottom-4 -right-4 text-emerald-800 opacity-50'>
			<Icon className='h-32 w-32' />
		</div>
	</motion.div>
);
