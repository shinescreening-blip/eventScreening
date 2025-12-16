// GiftCardPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  User,
  Send,
  Info,
  ChevronDown,
  X,
  CreditCard,
} from "lucide-react";

/**
 * GiftCardPage
 * Dark cinematic theme, Tailwind + Framer Motion + lucide-react
 *
 * Drop into your pages and route it to /gift-card
 */

const GIFT_OPTIONS = [
  {
    id: "g1",
    title: "₹1,000 Gift Card",
    amount: 1000,
    tagline: "A cosy movie night for one",
    img: "https://images.unsplash.com/photo-1517604931442-7d3cc2d6d29e?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "g2",
    title: "₹2,500 Gift Card",
    amount: 2500,
    tagline: "Perfect for couples or friends",
    img: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "g3",
    title: "₹5,000 Gift Card",
    amount: 5000,
    tagline: "Host a small private screening",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "g4",
    title: "Custom Amount",
    amount: 0,
    tagline: "Choose your own amount",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=60",
  },
];

const FAQS = [
  {
    q: "How do I redeem a gift card?",
    a: "Gift cards can be redeemed at checkout by entering the unique gift code we email to the recipient. If you face any issue, email shinescreening@gmail.com.",
  },
  {
    q: "Do gift cards expire?",
    a: "Our gift cards are valid for 12 months from the date of purchase. Terms may vary — check your email for the exact expiry date.",
  },
  {
    q: "Can I buy a custom amount?",
    a: "At the moment we offer fixed-value gift cards (₹1,000 / ₹2,500 / ₹5,000). For corporate or custom requests, contact us at shinescreening@gmail.com.",
  },
];

const StaggerContainer = ({ children }) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.08 } },
    }}
  >
    {children}
  </motion.div>
);

const Card = ({ option, onBuy }) => {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900/60 to-black border border-gray-800"
    >
      <div
        className="h-44 bg-cover bg-center"
        style={{ backgroundImage: `url(${option.img})` }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{option.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{option.tagline}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-yellow-400">₹{option.amount}</div>
            <div className="text-xs text-gray-400">Instant email delivery</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onBuy(option)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold bg-yellow-400 text-black hover:bg-yellow-300 transition-shadow shadow"
          >
            <CreditCard size={16} />
            Buy Now
          </button>
          <button
            onClick={() => alert("Preview feature — implement if needed")}
            className="px-4 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Preview
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const HowStep = ({ icon: Icon, title, desc }) => (
  <motion.div
    className="flex flex-col items-center text-center gap-3 p-6 bg-gray-900/60 rounded-2xl border border-gray-800"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="bg-yellow-400/10 p-4 rounded-full">
      <Icon className="text-yellow-400" />
    </div>
    <h4 className="text-white font-semibold">{title}</h4>
    <p className="text-sm text-gray-300">{desc}</p>
  </motion.div>
);

const FAQItem = ({ idx, item, open, onToggle }) => (
  <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
    <button
      onClick={() => onToggle(idx)}
      className="w-full px-4 py-4 flex items-center justify-between gap-4"
    >
      <div className="text-left">
        <div className="font-medium text-white">{item.q}</div>
      </div>
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ChevronDown className="text-gray-300" />
      </motion.div>
    </button>

    <AnimatePresence>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{ overflow: "hidden" }}
          className="px-4 pb-4 pt-0 text-gray-300"
        >
          <p className="leading-relaxed">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function GiftCard() {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [purchaseData, setPurchaseData] = useState({
    recipientName: "",
    recipientEmail: "",
    recipientContact: "",
    message: "",
    buyerName: "",
    buyerEmail: "",
    buyerContact: "",
    customAmount: "",
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);

  function onBuy(option) {
    setSelected(option);
    setShowModal(true);
    setSuccess(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setPurchaseData((p) => ({ ...p, [name]: value }));
  }

  async function handlePurchase(e) {
    e.preventDefault();
    setProcessing(true);

    // simulate API / payment
    await new Promise((r) => setTimeout(r, 900));
    setProcessing(false);
    setSuccess({
      code: `SCC-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
      ...selected,
    });

    // clear form (optional)
    setPurchaseData({
      recipientName: "",
      recipientEmail: "",
      recipientContact: "",
      message: "",
      buyerName: "",
      buyerEmail: "",
      buyerContact: "",
      customAmount: "",
    });
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* HERO */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1800&q=60')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Buy a Gift Card
          </motion.h1>

          <motion.p
            className="mt-4 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            Looking for the perfect gift? Look no further! Treat your friends and family to unforgettable movie moments with SCC's customisable gift cards - the perfect treat for any cinephile!
          </motion.p>

          <motion.div
            className="mt-8 inline-flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
              className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
            >
              Shop Gift Cards
            </button>
            <button
              onClick={() => alert("Contact sales at shinescreening@gmail.com")}
              className="px-4 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Corporate Enquiries
            </button>
          </motion.div>
        </div>
      </div>

      {/* GIFT CARD FORM */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6">Enter Gift Card Value:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {GIFT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onBuy(opt)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selected?.id === opt.id
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{opt.title}</div>
                    {opt.amount > 0 && (
                      <div className="text-yellow-400 font-bold">₹{opt.amount}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Gift Card Benefits:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Redeemable against any purchase on the website</li>
                <li>• Validity is for a period of 1 Year and applicable Pan-India</li>
                <li>• Transferable in case the recipient unable to utilize</li>
                <li>• Can be created for an amount of your choice!</li>
                <li>• Great way to surprise your loved one. You can also add a personalised message!</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HowStep
              icon={Gift}
              title="Choose a Card"
              desc="Pick a ready-made gift card or contact us for custom / corporate options."
            />
            <HowStep
              icon={User}
              title="Add Recipient Details"
              desc="Enter recipient's name & email for instant delivery."
            />
            <HowStep
              icon={Send}
              title="Send Instantly"
              desc="We email a unique gift code instantly — they redeem it at checkout."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white">Frequently Asked Questions</h3>
            <div className="text-gray-400 text-sm">Still have questions? shinescreening@gmail.com</div>
          </div>

          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <FAQItem
                key={i}
                idx={i}
                item={f}
                open={faqOpen === i}
                onToggle={(k) => setFaqOpen((prev) => (prev === k ? null : k))}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 space-y-3">
          <div className="text-white font-semibold">sunShineScreening</div>
          <div>For Customer Queries: <a className="text-yellow-400 underline" href="mailto:shinescreening@gmail.com">shinescreening@gmail.com</a></div>
          <div className="text-sm">© 2017-25 sunShineScreening</div>
        </div>
      </footer>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-xl w-full bg-gradient-to-b from-gray-900/95 to-black rounded-2xl border border-gray-800 shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-2 rounded-md text-gray-300 hover:bg-gray-800"
                aria-label="Close"
              >
                <X />
              </button>

              {!success ? (
                <>
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-800 mb-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Buying</div>
                      <div className="text-lg font-semibold text-white">{selected?.title}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold text-xl">₹{selected?.amount}</div>
                      <div className="text-xs text-gray-400">Secure checkout</div>
                    </div>
                  </div>

                  <form onSubmit={handlePurchase} className="space-y-4">
                    {selected?.id === 'g4' && (
                      <div>
                        <label className="text-sm text-gray-300">Custom Amount (₹)</label>
                        <input
                          type="number"
                          name="customAmount"
                          value={purchaseData.customAmount}
                          onChange={handleChange}
                          required
                          min="100"
                          className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="Enter amount"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-300">Recipient Name</label>
                        <input
                          name="recipientName"
                          value={purchaseData.recipientName}
                          onChange={handleChange}
                          required
                          className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300">Recipient Email</label>
                        <input
                          type="email"
                          name="recipientEmail"
                          value={purchaseData.recipientEmail}
                          onChange={handleChange}
                          required
                          className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-300">Recipient Contact No</label>
                      <input
                        type="tel"
                        name="recipientContact"
                        value={purchaseData.recipientContact}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-300">Personalised Message</label>
                      <textarea
                        name="message"
                        value={purchaseData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Add a personal message for the recipient"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-300">Your Name</label>
                        <input
                          name="buyerName"
                          value={purchaseData.buyerName}
                          onChange={handleChange}
                          required
                          className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300">Your Email</label>
                        <input
                          type="email"
                          name="buyerEmail"
                          value={purchaseData.buyerEmail}
                          onChange={handleChange}
                          required
                          className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-300">Your Contact No.</label>
                      <input
                        type="tel"
                        name="buyerContact"
                        value={purchaseData.buyerContact}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <h4 className="text-sm font-semibold text-white mb-2">Terms & Condition</h4>
                      <p className="text-xs text-gray-400">
                        By purchasing this gift card, you agree to our terms and conditions. Gift cards are valid for 1 year from purchase date and are redeemable against any purchase on our website.
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 py-3 rounded-full bg-yellow-400 font-semibold text-black hover:bg-yellow-300"
                      >
                        {processing ? "Processing..." : `Pay ₹${selected?.id === 'g4' ? purchaseData.customAmount : selected?.amount}`}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center bg-green-600/20 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Success! Gift Card Purchased</h4>
                  <p className="text-gray-300 mt-3">Gift code: <span className="font-mono text-yellow-400">{success.code}</span></p>
                  <p className="text-gray-400 mt-3">An email with the gift card details has been (simulated) sent to the recipient.</p>

                  <div className="mt-6 flex gap-3 justify-center">
                    <button
                      onClick={() => { setShowModal(false); setSuccess(null); }}
                      className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => { navigator.clipboard?.writeText(success.code); alert('Code copied'); }}
                      className="px-4 py-3 rounded-full border border-gray-700 text-gray-300"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
