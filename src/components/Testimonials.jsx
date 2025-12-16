import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaTimes, FaPlus } from 'react-icons/fa';

const initialTestimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Regular Movie-goer',
    movie: 'Interstellar',
    content: 'The open-air cinema experience was magical! The sound quality was excellent, and the atmosphere was perfect. Will definitely be coming back!',
    rating: 5,
    email: 'rahul@example.com'
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Film Enthusiast',
    movie: 'The Dark Knight',
    content: 'What an amazing way to watch movies! The drive-in setup was convenient, and the whole experience felt very premium. 5 stars!',
    rating: 5,
    email: 'priya@example.com'
  },
  {
    id: 3,
    name: 'Amit Desai',
    role: 'First-time Visitor',
    movie: 'Inception',
    content: 'I was skeptical at first, but this exceeded all my expectations. The staff was helpful, and the overall experience was top-notch.',
    rating: 4,
    email: 'amit@example.com'
  }
];

const ReviewForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    movie: '',
    rating: 5,
    review: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show thank you message
    setIsSubmitted(true);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      movie: '',
      rating: 5,
      review: ''
    });
    
    // Close the form after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 w-full max-w-md relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">Thanks for sharing your experience with us!</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="movie" className="block text-sm font-medium text-gray-700 mb-1">
              Movie Name
            </label>
            <input
              type="text"
              id="movie"
              name="movie"
              required
              value={formData.movie}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Which movie did you watch?"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Rating
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none"
                >
                  <FaStar 
                    className={`w-6 h-6 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">{formData.rating}/5</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              id="review"
              name="review"
              rows="4"
              required
              value={formData.review}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Share your experience..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          >
            Submit Review
          </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials] = useState(initialTestimonials);
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied movie lovers who've experienced the magic of open-air cinema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role} • {testimonial.movie}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-medium mr-1">{testimonial.rating}</span>
                    <FaStar className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
              </div>
              
              <div className="text-yellow-400 flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <FaStar key={i + testimonial.rating} className="w-5 h-5 text-gray-200" />
                ))}
              </div>
              
              <div className="relative">
                <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-200 text-4xl -z-10" />
                <p className="text-gray-600 italic relative z-10">{testimonial.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-6 py-3 rounded-full">
            <span className="font-medium">4.9/5</span>
            <span>•</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 text-yellow-400" />
              ))}
            </div>
            <span>•</span>
            <span>Based on {testimonials.length}+ reviews</span>
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
          >
            <FaPlus className="mr-2" />
            Write a Review
          </button>
        </div>
        
        <ReviewForm 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
        />
      </div>
    </section>
  );
};

export default Testimonials;
