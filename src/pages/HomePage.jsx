
import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import { 
	Package, 
	Truck, 
	Warehouse, 
	Globe, 
	Shield, 
	Clock, 
	MapPin,
	Zap,
	DollarSign,
	PhoneCall,
	CheckCircle,
	ArrowRight,
	Users,
	Award,
	Target
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import FeatureCard from "../components/FeatureCard";
import TestimonialCard from "../components/TestimonialCard";
import ProcessStep from "../components/ProcessStep";
import ContactForm from "../components/ContactForm";
import PartnersSection from "../components/PartnersSection";

const HomePage = () => {
	const { user } = useUserStore();

	const services = [
		{
			icon: Truck,
			title: "Freight Forwarding",
			description: "Comprehensive freight solutions for air, sea, and land transportation worldwide with competitive rates."
		},
		{
			icon: Globe,
			title: "International Shipping",
			description: "Seamless cross-border shipping with customs clearance and documentation support."
		},
		{
			icon: Warehouse,
			title: "Warehousing & Distribution",
			description: "State-of-the-art storage facilities with inventory management and distribution services."
		},
		{
			icon: Package,
			title: "Door-to-Door Delivery",
			description: "Complete pickup and delivery service from origin to final destination."
		},
		{
			icon: Target,
			title: "E-commerce Fulfillment",
			description: "Specialized solutions for online retailers with fast processing and shipping."
		},
		{
			icon: CheckCircle,
			title: "Customs Clearance",
			description: "Expert customs brokerage services ensuring smooth international trade."
		}
	];

	const features = [
		{
			icon: Zap,
			title: "Fast Delivery",
			description: "Express shipping options with guaranteed delivery times"
		},
		{
			icon: MapPin,
			title: "Real-time Tracking",
			description: "Monitor your shipments 24/7 with live updates"
		},
		{
			icon: Shield,
			title: "Secure Handling",
			description: "Advanced security measures and insurance coverage"
		},
		{
			icon: Globe,
			title: "Global Coverage",
			description: "Worldwide network spanning over 200 countries"
		}
	];

	const testimonials = [
		{
			name: "Sarah Johnson",
			company: "TechCorp Inc.",
			quote: "GlobalLogistics has transformed our supply chain. Their reliability and speed are unmatched. We've seen a 40% improvement in delivery times.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Michael Chen",
			company: "RetailMax",
			quote: "Outstanding service and support. They handle our international shipments flawlessly and their tracking system is excellent.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "Emma Rodriguez",
			company: "AutoParts Plus",
			quote: "Professional, efficient, and cost-effective. GlobalLogistics has been our trusted partner for over 5 years.",
			rating: 5,
			companyLogo: true
		},
		{
			name: "David Kim",
			company: "FashionForward",
			quote: "Their e-commerce fulfillment service is phenomenal. Orders are processed quickly and customers are always satisfied.",
			rating: 5,
			companyLogo: true
		}
	];

	const processSteps = [
		{
			number: 1,
			icon: PhoneCall,
			title: "Book",
			description: "Contact us or book online to get started with your shipment"
		},
		{
			number: 2,
			icon: Package,
			title: "Pickup",
			description: "We collect your goods from your location at the scheduled time"
		},
		{
			number: 3,
			icon: Truck,
			title: "Ship",
			description: "Your items are transported using our global network"
		},
		{
			number: 4,
			icon: CheckCircle,
			title: "Deliver",
			description: "Safe delivery to the final destination with confirmation"
		}
	];

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<HeroSection />

			{/* Partners Section */}
			<PartnersSection />

			{/* Services Section */}
			<section className='py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Services</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Comprehensive logistics solutions tailored to meet your business needs
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{services.map((service, index) => (
							<ServiceCard
								key={index}
								icon={service.icon}
								title={service.title}
								description={service.description}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Why Choose Us</h2>
						<p className='text-xl text-gray-600'>
							Experience the difference with our industry-leading capabilities
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{features.map((feature, index) => (
							<FeatureCard
								key={index}
								icon={feature.icon}
								title={feature.title}
								description={feature.description}
							/>
						))}
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className='py-20 bg-emerald-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>How It Works</h2>
						<p className='text-xl text-gray-600'>
							Simple steps to get your shipment moving
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{processSteps.map((step, index) => (
							<ProcessStep
								key={index}
								number={step.number}
								icon={step.icon}
								title={step.title}
								description={step.description}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>What Our Clients Say</h2>
						<p className='text-xl text-gray-600'>
							Trusted by businesses worldwide
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{testimonials.map((testimonial, index) => (
							<TestimonialCard
								key={index}
								name={testimonial.name}
								company={testimonial.company}
								quote={testimonial.quote}
								rating={testimonial.rating}
								companyLogo={testimonial.companyLogo}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Visual Showcase Section */}
			<section className='py-20 bg-gray-100'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Operations</h2>
						<p className='text-xl text-gray-600'>
							See our logistics network in action
						</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{/* Image Placeholders */}
						<div className='bg-gray-300 rounded-lg h-64 flex items-center justify-center'>
							<div className='text-center'>
								<Users className='w-12 h-12 text-gray-500 mx-auto mb-2' />
								<p className='text-gray-600'>Team Loading Packages</p>
							</div>
						</div>
						<div className='bg-gray-300 rounded-lg h-64 flex items-center justify-center'>
							<div className='text-center'>
								<Truck className='w-12 h-12 text-gray-500 mx-auto mb-2' />
								<p className='text-gray-600'>Fleet of Trucks</p>
							</div>
						</div>
						<div className='bg-gray-300 rounded-lg h-64 flex items-center justify-center'>
							<div className='text-center'>
								<Warehouse className='w-12 h-12 text-gray-500 mx-auto mb-2' />
								<p className='text-gray-600'>Warehouse Interior</p>
							</div>
						</div>
						<div className='bg-gray-300 rounded-lg h-64 flex items-center justify-center'>
							<div className='text-center'>
								<Globe className='w-12 h-12 text-gray-500 mx-auto mb-2' />
								<p className='text-gray-600'>Logistics Team</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Us Section */}
			<section className='py-20 bg-gray-900 text-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='text-3xl md:text-4xl font-bold mb-6'>About GlobalLogistics</h2>
							<p className='text-xl text-gray-300 mb-6 leading-relaxed'>
								With over 25 years of experience in the logistics industry, we've built a reputation for reliability, 
								innovation, and exceptional service. Our global network spans across continents, connecting businesses 
								with efficient supply chain solutions.
							</p>
							<p className='text-lg text-gray-400 mb-8'>
								We're certified by leading industry organizations and maintain the highest standards of security and quality.
							</p>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
								<div className='text-center'>
									<div className='text-3xl font-bold text-emerald-400 mb-2'>25+</div>
									<div className='text-gray-400'>Years Experience</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl font-bold text-emerald-400 mb-2'>200+</div>
									<div className='text-gray-400'>Countries Served</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl font-bold text-emerald-400 mb-2'>50K+</div>
									<div className='text-gray-400'>Happy Clients</div>
								</div>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='bg-gray-800 rounded-lg p-6 text-center'>
								<Award className='w-12 h-12 text-emerald-400 mx-auto mb-4' />
								<h3 className='font-semibold mb-2'>ISO Certified</h3>
								<p className='text-gray-400 text-sm'>Quality management systems</p>
							</div>
							<div className='bg-gray-800 rounded-lg p-6 text-center'>
								<Shield className='w-12 h-12 text-emerald-400 mx-auto mb-4' />
								<h3 className='font-semibold mb-2'>Secure</h3>
								<p className='text-gray-400 text-sm'>Advanced security protocols</p>
							</div>
							<div className='bg-gray-800 rounded-lg p-6 text-center'>
								<Clock className='w-12 h-12 text-emerald-400 mx-auto mb-4' />
								<h3 className='font-semibold mb-2'>24/7 Support</h3>
								<p className='text-gray-400 text-sm'>Round-the-clock assistance</p>
							</div>
							<div className='bg-gray-800 rounded-lg p-6 text-center'>
								<DollarSign className='w-12 h-12 text-emerald-400 mx-auto mb-4' />
								<h3 className='font-semibold mb-2'>Cost Effective</h3>
								<p className='text-gray-400 text-sm'>Competitive pricing</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Form Section */}
			<ContactForm />

			{/* CTA Section */}
			<section className='py-16 bg-emerald-600 text-white'>
				<div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>Ready to Ship?</h2>
					<p className='text-xl mb-8'>
						Get started with GlobalLogistics today and experience world-class shipping solutions.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<button className='bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 flex items-center justify-center group'>
							Get Quote Now
							<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
						</button>
						<button className='border-2 border-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300'>
							Call: +1 (555) 123-4567
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
