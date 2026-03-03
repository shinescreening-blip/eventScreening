import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  QrCode, 
  ChevronDown, 
  X, 
  AlertTriangle, 
  RefreshCw, 
  ArrowLeft,
  Shield,
  AlertCircle
} from 'lucide-react';

/* ================= PAYMENT PAGE ================= */

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    eventTitle = 'Event',
    subtotal = 0,
    discount = 0,
    finalPrice = 0,
    date,
    time,
    tickets = 1
  } = location.state || {};

  const [showPaymentError, setShowPaymentError] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Event
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ORDER SUMMARY */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-black/30 to-transparent">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                Order Summary
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{eventTitle}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                  <span>{date}</span>
                  <span>•</span>
                  <span>{time}</span>
                  <span>•</span>
                  <span>{tickets} {tickets > 1 ? 'Tickets' : 'Ticket'}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-base">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-green-400">Discount</span>
                  <span className="text-green-400">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-800 flex justify-between items-center">
                  <span className="font-bold text-lg">Amount Payable</span>
                  <span className="text-2xl font-extrabold text-yellow-400">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Secure Badge */}
            <div className="p-4 bg-black/30 border-t border-gray-800 flex items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-gray-400">Secure Payment</span>
            </div>
          </motion.div>

          {/* PAYMENT METHODS */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden h-full"
            >
              <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-black/30 to-transparent">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Payment Method
                </h2>
                <p className="text-sm text-gray-400 mt-1">Complete your booking with a secure payment</p>
              </div>

              <div className="p-6">
                <PaymentMethods
                  finalPrice={finalPrice}
                  onCancel={() => navigate(-1)}
                  onPaymentError={() => setShowPaymentError(true)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <PaymentErrorModal
        isOpen={showPaymentError}
        onClose={() => setShowPaymentError(false)}
      />
    </div>
  );
};

/* ================= PAYMENT METHODS ================= */

const PaymentMethods = ({ finalPrice, onCancel }) => {
  const [open, setOpen] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef(null);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  /* ---------- TIMER ---------- */
  useEffect(() => {
    if (open === 'upi') {
      setTimeLeft(120);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => (t <= 1 ? (clearInterval(timerRef.current), 0) : t - 1));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [open]);


  

  const amount = Number(finalPrice || 0).toFixed(2);
  const upiLink = `upi://pay?pa=shinescreenings2025@ibl&pn=${encodeURIComponent(
    'Shine Screenings'
  )}&am=${amount}&cu=INR&mc=5499&tn=Event+Payment`;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;

  const handlePaymentMethodSelect = (method) => {
    setOpen(open === method ? '' : method);
    if (method === 'card') {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => setIsProcessing(false), 1500);
    }
  };

  return (
    <div className="space-y-4">
      {/* PAYMENT METHOD: CARD */}
      <motion.div 
        className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="w-full flex justify-between items-center p-4 hover:bg-gray-800/50 transition-colors"
          onClick={() => handlePaymentMethodSelect('card')}
          disabled={isProcessing}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold">Credit / Debit Card</h4>
              <p className="text-xs text-gray-400">Pay securely with your card</p>
            </div>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${open === 'card' ? 'rotate-180' : ''}`} 
          />
        </button>

        <AnimatePresence>
          {open === 'card' && (
            <motion.div 
              className="border-t border-gray-800 p-4 bg-gray-900/30"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="Card Number" 
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="CVV" 
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Cardholder Name" 
                    className="col-span-2 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
                  />
                </div>
                
                <button 
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={() => setIsProcessing(true)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Pay ₹' + amount}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure SSL encryption</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* PAYMENT METHOD: UPI */}
      <motion.div 
        className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button
          className="w-full flex justify-between items-center p-4 hover:bg-gray-800/50 transition-colors"
          onClick={() => handlePaymentMethodSelect('upi')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400/10 rounded-lg">
              <QrCode className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold">UPI / QR Code</h4>
              <p className="text-xs text-gray-400">Scan To Pay</p>
            </div>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${open === 'upi' ? 'rotate-180' : ''}`} 
          />
        </button>

        <AnimatePresence>
          {open === 'upi' && (
            <motion.div 
              className="border-t border-gray-800 p-6 bg-gray-900/30"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center space-y-4">
                {/* QR Code */}
                <div className="relative pb-6">
                  <div className="p-4 bg-white rounded-xl">
                    <img
                      src={qrSrc}
                      alt="UPI QR Code"
                      className="w-44 h-44"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-md">
                    Shine Screenings
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2 mb-2">
                  {timeLeft > 0 ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="font-mono text-yellow-400 text-sm">
                        {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
                        {(timeLeft % 60).toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs text-gray-400">Time remaining</span>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>QR expired. Please refresh to generate a new one.</span>
                    </div>
                  )}
                </div>

                {/* UPI ID */}
                

                {/* Desktop Instructions */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-400">Scan the QR code with any UPI app</p>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={onCancel}
                  className="w-full border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white py-2 px-4 rounded-lg transition-colors mt-2 text-sm"
                >
                  Cancel Payment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};



const PaymentErrorModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Payment Failed</h3>
                  <p className="text-gray-400 mt-1">
                    We couldn't process your payment. Please try again or contact support.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Status</span>
                  <span className="font-medium text-red-400">Failed</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="font-mono text-sm">#TXN-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Time</span>
                  <span className="text-gray-300">
                    {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={onClose}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Contact Support
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  If amount was deducted, it will be refunded within 3-5 business days.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Payment;
