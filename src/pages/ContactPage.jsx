
import { motion } from "framer-motion";
import { 
	MapPin, 
	Phone, 
	Mail, 
	Clock, 
	MessageSquare,
	Send,
	Building,
	Globe
} from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		subject: "",
		message: "",
		serviceType: "general"
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Form submitted:", formData);
	};

	const offices = [
		{
			city: "New York",
			address: "1234 Logistics Ave, New York, NY 10001",
			phone: "+1 (555) 123-4567",
			email: "ny@globallogistics.com"
		},
		{
			city: "Los Angeles",
			address: "5678 Shipping Blvd, Los Angeles, CA 90210",
			phone: "+1 (555) 987-6543",
			email: "la@globallogistics.com"
		},
		{
			city: "London",
			address: "910 Freight Street, London, UK EC1A 1BB",
			phone: "+44 20 7123 4567",
			email: "london@globallogistics.com"
		},
		{
			city: "Singapore",
			address: "1122 Port Road, Singapore 018956",
			phone: "+65 6123 4567",
			email: "singapore@globallogistics.com"
		}
	];

	const serviceTypes = [
		{ value: "general", label: "General Inquiry" },
		{ value: "shipping", label: "Shipping Quote" },
		{ value: "tracking", label: "Tracking Issue" },
		{ value: "support", label: "Customer Support" },
		{ value: "partnership", label: "Partnership" },
		{ value: "careers", label: "Careers" }
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
							Contact <span className="text-emerald-400">Us</span>
						</h1>
						<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
							Get in touch with our logistics experts. We're here to help 
							with all your shipping and logistics needs.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Contact Form and Info Section */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="bg-white rounded-xl p-8 shadow-lg"
						>
							<div className="flex items-center mb-6">
								<MessageSquare className="w-8 h-8 text-emerald-600 mr-3" />
								<h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
							</div>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										placeholder="Full Name *"
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
									/>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="Email Address *"
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										placeholder="Phone Number"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
									/>
									<input
										type="text"
										name="company"
										value={formData.company}
										onChange={handleInputChange}
										placeholder="Company Name"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<select
										name="serviceType"
										value={formData.serviceType}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
									>
										{serviceTypes.map(type => (
											<option key={type.value} value={type.value}>{type.label}</option>
										))}
									</select>
									<input
										type="text"
										name="subject"
										value={formData.subject}
										onChange={handleInputChange}
										placeholder="Subject *"
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
									/>
								</div>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									placeholder="Your Message *"
									required
									rows="6"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
								/>
								<button
									type="submit"
									className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 flex items-center justify-center"
								>
									<Send className="w-5 h-5 mr-2" />
									Send Message
								</button>
							</form>
						</motion.div>

						{/* Contact Information */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="space-y-8"
						>
							<div>
								<h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
								<p className="text-lg text-gray-600 mb-8">
									Ready to streamline your logistics? Our team of experts is standing by 
									to help you find the perfect shipping solution for your business needs.
								</p>
							</div>

							{/* Quick Contact */}
							<div className="bg-white rounded-xl p-6 shadow-lg">
								<h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact</h3>
								<div className="space-y-4">
									<div className="flex items-center">
										<Phone className="w-5 h-5 text-emerald-600 mr-3" />
										<span className="text-gray-700">+1 (555) 123-4567</span>
									</div>
									<div className="flex items-center">
										<Mail className="w-5 h-5 text-emerald-600 mr-3" />
										<span className="text-gray-700">info@globallogistics.com</span>
									</div>
									<div className="flex items-center">
										<Clock className="w-5 h-5 text-emerald-600 mr-3" />
										<span className="text-gray-700">24/7 Customer Support</span>
									</div>
								</div>
							</div>

							{/* Emergency Contact */}
							<div className="bg-red-50 rounded-xl p-6 border border-red-200">
								<h3 className="text-xl font-semibold text-red-800 mb-4">Emergency Support</h3>
								<p className="text-red-700 mb-3">
									For urgent shipment issues or emergencies
								</p>
								<div className="flex items-center">
									<Phone className="w-5 h-5 text-red-600 mr-3" />
									<span className="text-red-800 font-semibold">+1 (555) 911-SHIP</span>
								</div>
							</div>

							{/* Business Hours */}
							<div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
								<h3 className="text-xl font-semibold text-emerald-800 mb-4">Business Hours</h3>
								<div className="space-y-2 text-emerald-700">
									<div className="flex justify-between">
										<span>Monday - Friday:</span>
										<span>8:00 AM - 8:00 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Saturday:</span>
										<span>9:00 AM - 6:00 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Sunday:</span>
										<span>10:00 AM - 4:00 PM</span>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Global Offices Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Global Offices</h2>
						<p className="text-xl text-gray-600">
							Find our offices worldwide for local support and services
						</p>
					</motion.div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{offices.map((office, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300"
							>
								<div className="flex items-center mb-4">
									<Building className="w-6 h-6 text-emerald-600 mr-2" />
									<h3 className="text-xl font-semibold text-gray-900">{office.city}</h3>
								</div>
								<div className="space-y-3 text-gray-600">
									<div className="flex items-start">
										<MapPin className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" />
										<span className="text-sm">{office.address}</span>
									</div>
									<div className="flex items-center">
										<Phone className="w-4 h-4 text-emerald-600 mr-2" />
										<span className="text-sm">{office.phone}</span>
									</div>
									<div className="flex items-center">
										<Mail className="w-4 h-4 text-emerald-600 mr-2" />
										<span className="text-sm">{office.email}</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Map Section */}
			<section className="py-20 bg-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
						<p className="text-xl text-gray-600">
							Visit our headquarters in New York
						</p>
					</motion.div>
					<div className="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
						<div className="text-center">
							<MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
							<p className="text-gray-600">Interactive Map Coming Soon</p>
							<p className="text-gray-500 text-sm">1234 Logistics Ave, New York, NY 10001</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;
