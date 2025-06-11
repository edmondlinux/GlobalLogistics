
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
		console.log('Form submitted:', formData);
	};

	return (
		<div className='bg-gray-50 py-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Get In Touch</h2>
					<p className='text-xl text-gray-600'>Ready to ship? Contact us for a personalized quote</p>
				</div>
				
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Contact Form */}
					<div className='bg-white rounded-xl p-8 shadow-lg'>
						<form onSubmit={handleSubmit}>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
								<div>
									<label className='block text-gray-700 font-semibold mb-2'>Name</label>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
										required
									/>
								</div>
								<div>
									<label className='block text-gray-700 font-semibold mb-2'>Email</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
										required
									/>
								</div>
							</div>
							<div className='mb-6'>
								<label className='block text-gray-700 font-semibold mb-2'>Subject</label>
								<input
									type="text"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
									required
								/>
							</div>
							<div className='mb-6'>
								<label className='block text-gray-700 font-semibold mb-2'>Message</label>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleChange}
									rows="5"
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
									required
								></textarea>
							</div>
							<button
								type="submit"
								className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition duration-300'
							>
								Send Message
							</button>
						</form>
					</div>
					
					{/* Contact Info & Map */}
					<div>
						<div className='bg-white rounded-xl p-8 shadow-lg mb-6'>
							<h3 className='text-2xl font-bold text-gray-900 mb-6'>Contact Information</h3>
							<div className='space-y-4'>
								<div className='flex items-center'>
									<Phone className='w-6 h-6 text-emerald-600 mr-4' />
									<div>
										<p className='font-semibold text-gray-900'>Phone</p>
										<p className='text-gray-600'>+1 (555) 123-4567</p>
									</div>
								</div>
								<div className='flex items-center'>
									<Mail className='w-6 h-6 text-emerald-600 mr-4' />
									<div>
										<p className='font-semibold text-gray-900'>Email</p>
										<p className='text-gray-600'>info@globallogistics.com</p>
									</div>
								</div>
								<div className='flex items-center'>
									<MapPin className='w-6 h-6 text-emerald-600 mr-4' />
									<div>
										<p className='font-semibold text-gray-900'>Address</p>
										<p className='text-gray-600'>123 Logistics Way, Shipping City, SC 12345</p>
									</div>
								</div>
							</div>
						</div>
						
						{/* Map Placeholder */}
						<div className='bg-gray-300 rounded-xl h-64 flex items-center justify-center'>
							<div className='text-center'>
								<MapPin className='w-12 h-12 text-gray-500 mx-auto mb-2' />
								<p className='text-gray-600'>Google Maps Embed Placeholder</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
