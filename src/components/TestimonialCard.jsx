
import { Star } from "lucide-react";

const TestimonialCard = ({ name, company, quote, rating = 5, profileImage, companyLogo }) => {
	// Generate a profile image using DiceBear Avatars if no profileImage is provided
	const getProfileImage = () => {
		if (profileImage) return profileImage;
		
		// Use DiceBear Avatars - free avatar generation service
		// Using 'initials' style for professional look
		const encodedName = encodeURIComponent(name);
		return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}&backgroundColor=10b981,059669,047857&textColor=ffffff`;
	};

	return (
		<div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300'>
			<div className='flex mb-4'>
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
					/>
				))}
			</div>
			<p className='text-gray-700 mb-6 leading-relaxed italic'>"{quote}"</p>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<div className='w-12 h-12 rounded-full flex items-center justify-center mr-4 overflow-hidden'>
						<img 
							src={getProfileImage()} 
							alt={name} 
							className='w-12 h-12 rounded-full object-cover'
							onError={(e) => {
								// Fallback to initials if image fails to load
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<div className='w-12 h-12 bg-emerald-600 rounded-full hidden items-center justify-center'>
							<span className='text-white font-semibold'>{name.charAt(0)}</span>
						</div>
					</div>
					<div>
						<h4 className='font-semibold text-gray-900'>{name}</h4>
						<p className='text-gray-600 text-sm'>{company}</p>
					</div>
				</div>
				{companyLogo && (
					<div className='w-16 h-8 bg-gray-200 rounded flex items-center justify-center'>
						<span className='text-xs text-gray-500'>LOGO</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default TestimonialCard;
