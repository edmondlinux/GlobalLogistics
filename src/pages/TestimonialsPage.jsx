
import { motion } from "framer-motion";
import { Star, Quote, Building, Calendar, CheckCircle } from "lucide-react";
import TestimonialCard from "../components/TestimonialCard";

const TestimonialsPage = () => {
	const featuredTestimonials = [
		{
			name: "Sarah Johnson",
			company: "TechCorp Inc.",
			position: "Supply Chain Director",
			quote: "GlobalLogistics has completely transformed our supply chain operations. Their real-time tracking system and reliable delivery network have helped us improve our customer satisfaction by 40%. The team's proactive communication and problem-solving approach make them an invaluable partner.",
			rating: 5,
			industry: "Technology",
			shipmentVolume: "500+ monthly",
			partnership: "3 years",
			results: ["40% faster delivery", "99.8% on-time rate", "30% cost reduction"]
		},
		{
			name: "Michael Chen",
			company: "RetailMax",
			position: "Logistics Manager",
			quote: "Working with GlobalLogistics for our international shipping needs has been a game-changer. Their customs clearance expertise and global network have enabled us to expand into 15 new markets seamlessly. Outstanding service that scales with our business growth.",
			rating: 5,
			industry: "Retail",
			shipmentVolume: "1000+ monthly",
			partnership: "4 years",
			results: ["15 new markets", "Zero customs delays", "25% growth in international sales"]
		},
		{
			name: "Emma Rodriguez",
			company: "AutoParts Plus",
			position: "Operations Director",
			quote: "Professional, efficient, and incredibly reliable. GlobalLogistics has been our trusted logistics partner for over 5 years. Their warehouse management system and just-in-time delivery service have helped us reduce inventory costs while maintaining 99.9% stock availability.",
			rating: 5,
			industry: "Automotive",
			shipmentVolume: "2000+ monthly",
			partnership: "5 years",
			results: ["20% inventory reduction", "99.9% stock availability", "15% cost savings"]
		}
	];

	const allTestimonials = [
		{
			name: "David Kim",
			company: "FashionForward",
			quote: "Their e-commerce fulfillment service is phenomenal. Orders are processed quickly and customers are always satisfied with the fast delivery times.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Lisa Thompson",
			company: "MedSupply Corp",
			quote: "Critical medical supplies require special handling, and GlobalLogistics delivers every time. Their temperature-controlled logistics are essential for our business.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Ahmed Hassan",
			company: "Global Electronics",
			quote: "Excellent international shipping services. They handle all the documentation and customs procedures seamlessly. Highly recommend for overseas shipments.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Jennifer Martinez",
			company: "Fresh Foods Inc.",
			quote: "Cold chain logistics at its finest. Our perishable goods arrive fresh and on time thanks to their specialized refrigerated transport network.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Robert Wilson",
			company: "Construction Pro",
			quote: "Heavy machinery and construction materials require expertise. GlobalLogistics handles our oversized shipments with precision and care every time.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Maria Garcia",
			company: "Artisan Crafts",
			quote: "As a small business, their flexible solutions and competitive pricing have been crucial for our growth. Personal service with enterprise capabilities.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Tom Anderson",
			company: "Chemical Solutions",
			quote: "Hazardous materials shipping requires specialized knowledge. Their certified team ensures compliance and safety in every shipment. Exceptional service.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Priya Sharma",
			company: "BookWorld",
			quote: "Fast, reliable, and cost-effective shipping for our book distribution. Their automated sorting and tracking system is impressive. Great partnership.",
			rating: 5,
			companyLogo: true
		}
	];

	const industries = [
		{ name: "Technology", count: "150+ clients", icon: "💻" },
		{ name: "Retail & E-commerce", count: "300+ clients", icon: "🛍️" },
		{ name: "Healthcare", count: "80+ clients", icon: "🏥" },
		{ name: "Automotive", count: "120+ clients", icon: "🚗" },
		{ name: "Food & Beverage", count: "200+ clients", icon: "🍎" },
		{ name: "Manufacturing", count: "180+ clients", icon: "🏭" }
	];

	const stats = [
		{ number: "98%", label: "Customer Satisfaction", icon: "⭐" },
		{ number: "1000+", label: "Happy Clients", icon: "😊" },
		{ number: "50M+", label: "Successful Deliveries", icon: "📦" },
		{ number: "99.8%", label: "On-Time Delivery", icon: "⏰" }
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
							Client <span className="text-emerald-400">Testimonials</span>
						</h1>
						<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
							Discover why thousands of businesses trust GlobalLogistics 
							for their shipping and logistics needs.
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
								<div className="text-4xl mb-3">{stat.icon}</div>
								<div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
								<div className="text-gray-600">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Testimonials */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Success Stories</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							In-depth case studies showcasing real results from our valued clients
						</p>
					</motion.div>

					<div className="space-y-12">
						{featuredTestimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								className="bg-gray-50 rounded-2xl p-8 shadow-lg"
							>
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
									<div className="lg:col-span-2">
										<div className="flex items-start mb-6">
											<Quote className="w-12 h-12 text-emerald-600 mr-4 flex-shrink-0" />
											<div>
												<p className="text-lg text-gray-700 leading-relaxed italic mb-6">
													"{testimonial.quote}"
												</p>
												<div className="flex mb-4">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className="w-5 h-5 text-yellow-400 fill-current"
														/>
													))}
												</div>
												<div className="flex items-center">
													<div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center mr-4">
														<span className="text-white font-semibold text-xl">
															{testimonial.name.charAt(0)}
														</span>
													</div>
													<div>
														<h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
														<p className="text-emerald-600 font-medium">{testimonial.position}</p>
														<p className="text-gray-600">{testimonial.company}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-white rounded-xl p-6">
										<h5 className="font-semibold text-gray-900 mb-4">Partnership Details</h5>
										<div className="space-y-3 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">Industry:</span>
												<span className="font-medium">{testimonial.industry}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Monthly Volume:</span>
												<span className="font-medium">{testimonial.shipmentVolume}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Partnership:</span>
												<span className="font-medium">{testimonial.partnership}</span>
											</div>
										</div>
										<div className="mt-6">
											<h6 className="font-semibold text-gray-900 mb-3">Key Results:</h6>
											<div className="space-y-2">
												{testimonial.results.map((result, resultIndex) => (
													<div key={resultIndex} className="flex items-center text-sm">
														<CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
														<span className="text-gray-700">{result}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Industry Coverage */}
			<section className="py-20 bg-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
						<p className="text-xl text-gray-600">
							Trusted by businesses across diverse industries
						</p>
					</motion.div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{industries.map((industry, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition duration-300"
							>
								<div className="text-4xl mb-4">{industry.icon}</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h3>
								<p className="text-emerald-600 font-medium">{industry.count}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* All Testimonials */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
						<p className="text-xl text-gray-600">
							Real feedback from real businesses
						</p>
					</motion.div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{allTestimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
							>
								<TestimonialCard
									name={testimonial.name}
									company={testimonial.company}
									quote={testimonial.quote}
									rating={testimonial.rating}
									companyLogo={testimonial.companyLogo}
								/>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-emerald-600 text-white">
				<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Success Stories</h2>
						<p className="text-xl mb-8">
							Ready to experience the GlobalLogistics difference? 
							Let us help you achieve your logistics goals.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300">
								Get Your Quote
							</button>
							<button className="border-2 border-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300">
								Schedule Consultation
							</button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default TestimonialsPage;
