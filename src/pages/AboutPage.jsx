
import { motion } from "framer-motion";
import { 
	Award, 
	Shield, 
	Clock, 
	DollarSign, 
	Globe, 
	Users, 
	Target,
	Truck,
	Package,
	MapPin
} from "lucide-react";

const AboutPage = () => {
	const stats = [
		{ number: "25+", label: "Years Experience", icon: Clock },
		{ number: "200+", label: "Countries Served", icon: Globe },
		{ number: "50K+", label: "Happy Clients", icon: Users },
		{ number: "99.9%", label: "Delivery Success", icon: Target }
	];

	const values = [
		{
			title: "Reliability",
			description: "We deliver on our promises with consistent, dependable service that you can count on.",
			icon: Shield
		},
		{
			title: "Innovation",
			description: "Continuously evolving our technology and processes to provide cutting-edge logistics solutions.",
			icon: Award
		},
		{
			title: "Excellence",
			description: "Committed to exceeding expectations in every aspect of our service delivery.",
			icon: Target
		},
		{
			title: "Global Reach",
			description: "Connecting businesses worldwide with our extensive network and local expertise.",
			icon: Globe
		}
	];

	const milestones = [
		{
			year: "1998",
			title: "Company Founded",
			description: "Started with a vision to revolutionize logistics"
		},
		{
			year: "2005",
			title: "International Expansion",
			description: "Extended services to 50+ countries"
		},
		{
			year: "2015",
			title: "Technology Integration",
			description: "Launched real-time tracking platform"
		},
		{
			year: "2023",
			title: "Sustainability Initiative",
			description: "Committed to carbon-neutral delivery"
		}
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative bg-gray-900 text-white py-24">
				<div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							About <span className="text-emerald-400">GlobalLogistics</span>
						</h1>
						<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
							Leading the future of logistics with innovative solutions, 
							reliable service, and a commitment to excellence.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-emerald-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="text-center bg-white rounded-xl p-6 shadow-lg"
							>
								<stat.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
								<div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
								<div className="text-gray-600">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Our Story Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
							<p className="text-lg text-gray-700 mb-6 leading-relaxed">
								Founded in 1998, GlobalLogistics began as a small freight forwarding company 
								with a big vision: to make global shipping simple, reliable, and accessible 
								for businesses of all sizes.
							</p>
							<p className="text-lg text-gray-700 mb-6 leading-relaxed">
								Over the past 25 years, we've grown from a local operation to a global 
								network spanning over 200 countries. Our success is built on the trust 
								of our clients and the dedication of our team.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed">
								Today, we're proud to be recognized as an industry leader, continuing 
								to innovate and set new standards in logistics excellence.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="grid grid-cols-2 gap-4"
						>
							<div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
								<Package className="w-16 h-16 text-gray-500" />
							</div>
							<div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
								<Truck className="w-16 h-16 text-gray-500" />
							</div>
							<div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center col-span-2">
								<MapPin className="w-16 h-16 text-gray-500" />
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-20 bg-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							The principles that guide everything we do
						</p>
					</motion.div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{values.map((value, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="bg-white rounded-xl p-6 shadow-lg text-center"
							>
								<value.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
								<p className="text-gray-600">{value.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
						<p className="text-xl text-gray-600">
							Key milestones in our growth story
						</p>
					</motion.div>
					<div className="relative">
						<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>
						{milestones.map((milestone, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: index * 0.2 }}
								className={`relative flex items-center mb-12 ${
									index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
								}`}
							>
								<div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
									<div className="bg-white rounded-lg p-6 shadow-lg">
										<div className="text-emerald-600 font-bold text-lg mb-2">{milestone.year}</div>
										<h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
										<p className="text-gray-600">{milestone.description}</p>
									</div>
								</div>
								<div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white"></div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Certifications Section */}
			<section className="py-20 bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Awards</h2>
						<p className="text-xl text-gray-300">
							Recognized for excellence in the logistics industry
						</p>
					</motion.div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="bg-gray-800 rounded-lg p-6 text-center">
							<Award className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
							<h3 className="font-semibold mb-2">ISO 9001:2015</h3>
							<p className="text-gray-400 text-sm">Quality Management Systems</p>
						</div>
						<div className="bg-gray-800 rounded-lg p-6 text-center">
							<Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
							<h3 className="font-semibold mb-2">C-TPAT Certified</h3>
							<p className="text-gray-400 text-sm">Customs-Trade Partnership</p>
						</div>
						<div className="bg-gray-800 rounded-lg p-6 text-center">
							<Globe className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
							<h3 className="font-semibold mb-2">IATA Certified</h3>
							<p className="text-gray-400 text-sm">Air Transport Association</p>
						</div>
						<div className="bg-gray-800 rounded-lg p-6 text-center">
							<DollarSign className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
							<h3 className="font-semibold mb-2">Best Logistics Provider</h3>
							<p className="text-gray-400 text-sm">Industry Excellence Award 2023</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
