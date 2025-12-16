import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GalleryHero from '../components/GalleryHero';
import GalleryGrid from '../components/GalleryGrid';
import { galleryData } from '../data/galleryData';

const Gallery = () => {
  const [filteredPhotos, setFilteredPhotos] = useState(galleryData);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Get unique categories from gallery data
  const categories = ['All Categories', ...new Set(galleryData.map(photo => photo.category))];

  // Pagination
  const photosPerPage = 9;
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;
  const currentPhotos = filteredPhotos.slice(startIndex, endIndex);

  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setCurrentPage(1);
    
    // Simulate API call delay
    setTimeout(() => {
      if (category === 'All Categories') {
        setFilteredPhotos(galleryData);
      } else {
        const filtered = galleryData.filter(photo => photo.category === category);
        setFilteredPhotos(filtered);
      }
      setLoading(false);
    }, 500);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <GalleryHero />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Event Gallery
              </h2>
              <p className="text-gray-600">
                Browse through our collection of cinema event photos
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'All Categories' ? 'All Photos' : `${selectedCategory} Photos`}
              </h3>
              <p className="text-gray-600">
                {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {selectedCategory !== 'All Categories' && (
              <motion.button
                onClick={() => handleCategoryChange('All Categories')}
                className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Categories
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GalleryGrid photos={currentPhotos} loading={loading} />
        </motion.div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-300'
                }`}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
              >
                « Previous
              </motion.button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                );
              })}

              {/* Next Button */}
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-300'
                }`}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
              >
                Next »
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {!loading && filteredPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-black">
              <h3 className="text-2xl font-bold mb-4">
                Want to see your photos here?
              </h3>
              <p className="text-lg mb-6">
                Tag us in your cinema experience photos and we might feature them in our gallery!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                Share Your Photos
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
