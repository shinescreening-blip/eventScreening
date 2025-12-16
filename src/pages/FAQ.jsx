import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    section: 'GENERAL',
    faqs: [
      { q: 'What does my ticket include?', a: 'The ticket includes entry to the movie screening only.' },
      { q: 'Will there be Food & Beverages available at the venue?', a: 'Kindly check the event for details on availability of Food and Beverages at the venue.' },
      { q: 'What is my ticket?', a: 'After making your purchase you will receive an E-ticket on your registered email id, this E-ticket is to be shown at entry.' },
      { q: 'What is the location of the venue?', a: 'The location map and details are available at the bottom of the event page.' },
      { q: 'Are there any allocated seats/parking slots?', a: 'Drive-In slots/ Seating is on a first-come first-serve basis. The screen visibility is great from all the spots.' },
      { q: 'Are children allowed?', a: "Children are allowed subject to the film's certification. Our stewards will ensure all audience members are of suitable age to see the film. In case kids are allowed, entry is free for kids below 5 years of age." },
      { q: 'Are there toilet facilities available?', a: 'Yes, toilet facilities are available at all our venues.' },
      { q: 'Can I transfer my tickets for another show?', a: 'Transfer of tickets to another show is not permitted. Tickets once bought can neither be cancelled nor transferred to any other shows.' },
      { q: 'If the show is cancelled will I receive a refund?', a: 'If the show is cancelled for any reason except for Force Majeure (rains, lockdown, etc.) you will receive a full-refund within 7 business days.' },
      { q: 'What if it rains?', a: 'In case the show is cancelled due to rains, the ticket will be valid for another show during the next 30 days. However tickets will not be refunded due to inclement weather.' },
    ],
  },
  {
    section: 'MEMBERSHIP QUESTIONS',
    faqs: [
      { q: 'What does the membership entail?', a: 'As a member you can avail a ticket for every show from sunShineScreening at any of our locations, Pan-India. You can book for free even 8 shows a month! There are limited seats available.' },
      { q: 'As a member how can I book a ticket?', a: 'When purchasing the ticket, RSVP as a member and continue till asked for a member ID, once you put in your member ID the ticket purchase is made free of cost. This is valid only for one member ID per show. Please carry your ID proof with your ticket to show at the entry.' },
      { q: 'Can I book more than one ticket?', a: 'You can purchase only one free ticket per event via your membership ID. A Member ticket for Drive-In is valid for upto 4 people per car.' },
      { q: 'Can I book for 2 consecutive shows?', a: 'Yes.' },
    ],
  },
  {
    section: 'PAYMENT RELATED QUERIES',
    faqs: [
      { q: 'Can I cancel my ticket?', a: 'There are no cancellations. You can only reschedule your ticket in case a show is cancelled by SCC for any reason.' },
      { q: 'Payment has been deducted but I have not received a ticket or confirmation?', a: "Don't worry, Please send a screenshot of the transaction along with your name, registered phone number/registered email to shinescreening@gmail.com, we will resolve it." },
    ],
  },
  {
    section: 'MISCELLANEOUS QUESTIONS',
    faqs: [
      { q: 'Do you give large groups a discount on bookings?', a: 'Yes. We accommodate large group bookings, for a special case email us at shinescreening@gmail.com' },
      { q: 'Can I hire SCC for a private event?', a: 'Yes, you can book a private event/ corporate event/ marketing collaborative with us. Email us at shinescreening@gmail.com. For marketing collaborations, email : shinescreening@gmail.com' },
    ],
  },
];

const AccordionItem = ({ id, question, answer, isOpen, onToggle }) => {
  return (
    <div className="py-4">
      <button
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
      >
        <span className="font-medium text-white">{question}</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown size={18} />
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-3">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openKey, setOpenKey] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqData;

    return faqData
      .map((section) => {
        const faqs = section.faqs.filter(
          (f) => (f.q + ' ' + f.a).toLowerCase().includes(q)
        );
        return { ...section, faqs };
      })
      .filter((s) => s.faqs.length > 0);
  }, [query]);

  const toggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=60')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            FAQs
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Answers to common questions about tickets, membership, payments and private events.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs (e.g., ticket, refund, member)..."
              className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl border border-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <button
              onClick={() => { setQuery(''); setOpenKey(null); }}
              className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-12 bg-gray-900 rounded-2xl">No FAQs matched your search.</div>
          ) : (
            filtered.map((section, si) => (
              <section key={section.section}>
                <h3 className="text-xl font-semibold text-white mb-4">{section.section}</h3>
                <div className="bg-gray-900 rounded-2xl p-4">
                  {section.faqs.map((faq, fi) => {
                    const key = `${si}-${fi}`;
                    return (
                      <AccordionItem
                        key={key}
                        id={key}
                        question={faq.q}
                        answer={faq.a}
                        isOpen={openKey === key}
                        onToggle={toggle}
                      />
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10 mt-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 space-y-4">
          <div>
            <h4 className="text-white font-semibold">sunShineScreening</h4>
            <p>For Customer Queries: <a className="underline text-yellow-400" href="mailto:shinescreening@gmail.com">shinescreening@gmail.com</a></p>
            <p>Phone: </p>
            <p>Cities: Mumbai · Bangalore · Hyderabad · Delhi NCR · Pune · Chandigarh</p>
          </div>
          <div className="pt-4 text-sm text-gray-500">© Copyright 2017-25 sunShineScreening</div>
          <div className="pt-2 text-xs text-gray-600">Developed By: Mahesh Bhanushali</div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;