import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

const JoinClubModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = 'Full Name is required.';
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid.';
    }
    if (!formData.contactNumber) {
      tempErrors.contactNumber = 'Contact Number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      tempErrors.contactNumber = 'Contact Number must be 10 digits.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully:', formData);
      // Here you would typically send the data to a server
      setIsSubmitted(true);
    }
  };

  
    const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
      <motion.div
            className="bg-gray-900 text-white rounded-lg shadow-xl p-8 m-4 max-w-md w-full relative"
            variants={modalVariants}
          >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        {isSubmitted ? (
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-bold mt-6 mb-2 text-white">Thank You!</h2>
            <p className="text-gray-300">Your submission has been received. We'll reach out to you soon!</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">Join The Club</h2>
            <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>} 
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
            <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300">
            Submit
          </button>
                    </form>
          </>
        )}
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinClubModal;
