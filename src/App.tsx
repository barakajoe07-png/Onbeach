/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Menu, Search, User, Briefcase, Heart, Clock, Star, ShieldCheck, PiggyBank, Palmtree, CheckCircle, MessageCircle, X, Mail, Loader2 } from 'lucide-react';

const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  userEmail: string;
  login: (email: string) => void;
  logout: () => void;
}>({
  isLoggedIn: false, userEmail: '', login: () => {}, logout: () => {}
});

const LoginModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      login(email);
      onClose();
    } else {
      setError('Please enter a valid email address');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        <div className="bg-[#1e3a8a] text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-lg">Log In</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold text-[#1e3a8a] mb-1">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#facc15] outline-none bg-white`}
              placeholder="you@example.com"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button type="submit" className="w-full bg-[#facc15] hover:bg-yellow-400 text-[#1e3a8a] font-bold py-3 rounded-xl transition-colors">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

const ContactForm = ({ inModal = false, initialSubject = 'general' }: { inModal?: boolean, initialSubject?: string }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');

  const handleEmailSupport = () => {
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    window.location.href = `mailto:support@onthebeach.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsapp = () => {
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`;
    window.open(`https://wa.me/254710492539?text=${encodeURIComponent(body)}`, '_blank');
  };

  return (
    <div className={`space-y-4 ${inModal ? '' : 'bg-gray-50 p-6 rounded-xl border border-gray-200 mt-4 shadow-sm'}`}>
      {!inModal && (
         <p className="text-sm text-gray-700 font-medium mb-2">Contact our support team or quick chat on WhatsApp below:</p>
      )}
      <div>
        <label className="block text-sm font-bold text-[#1e3a8a] mb-1">Name</label>
        <input 
          type="text"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#facc15] focus:border-[#facc15] outline-none bg-white mb-4"
          placeholder="Your full name"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-[#1e3a8a] mb-1">Email</label>
            <input 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#facc15] focus:border-[#facc15] outline-none bg-white"
              placeholder="Your email address"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1e3a8a] mb-1">Phone</label>
            <input 
              type="tel"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#facc15] focus:border-[#facc15] outline-none bg-white"
              placeholder="Your phone number"
            />
          </div>
        </div>

        <label className="block text-sm font-bold text-[#1e3a8a] mb-1">Subject</label>
        <select 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#facc15] focus:border-[#facc15] outline-none bg-white"
        >
          <option value="general">General Enquiry</option>
          <option value="booking">My Booking</option>
          <option value="refund">Request a Refund</option>
          <option value="cancellation">Cancellation</option>
          <option value="complaint">Complaint</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-[#1e3a8a] mb-1">Message</label>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#facc15] focus:border-[#facc15] outline-none resize-none bg-white"
          placeholder="How can we help you today?"
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button 
          onClick={handleEmailSupport}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-[#1e3a8a] py-3 px-4 rounded-xl transition-colors font-bold text-sm gap-2"
        >
          <Mail size={18} />
          Email Support
        </button>
        <button 
          onClick={handleWhatsapp}
          className="flex items-center justify-center bg-[#25D366] hover:bg-[#1ebd57] text-white py-3 px-4 rounded-xl transition-colors font-bold text-sm gap-2"
        >
          <MessageCircle size={18} fill="currentColor" />
          WhatsApp Chat
        </button>
      </div>
    </div>
  );
};

const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSubject, setInitialSubject] = useState('general');

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.subject) setInitialSubject(e.detail.subject);
      setIsOpen(true);
    };
    window.addEventListener('open-help-modal', handleOpen);
    return () => window.removeEventListener('open-help-modal', handleOpen);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#facc15] text-[#1e3a8a] p-4 rounded-full shadow-2xl hover:bg-yellow-400 transition-transform hover:scale-110 z-50 flex items-center justify-center group border-4 border-white"
        aria-label="Need Help?"
      >
        <MessageCircle size={28} className="group-hover:animate-ping absolute opacity-20" />
        <MessageCircle size={28} className="relative z-10" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="bg-[#1e3a8a] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2"><MessageCircle size={20} /> Help & Support</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"><X size={24} /></button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">Need help now? Contact our support team or start a quick chat on WhatsApp below.</p>
              
              <ContactForm inModal={true} initialSubject={initialSubject} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TopBar = () => (
  <div className="bg-[#facc15] text-[#1e3a8a] text-xs font-semibold py-2 px-4 flex justify-between md:justify-center md:gap-8 overflow-x-auto whitespace-nowrap hidden sm:flex">
    <div className="flex items-center gap-2">
      <span className="font-bold">Spread the Cost:</span> Monthly payment plans
    </div>
    <div className="hidden md:block w-px bg-[#1e3a8a] opacity-20"></div>
    <div className="flex items-center gap-2">
      <span className="font-bold">Price Drop Protection:</span> Lowest price, guaranteed.
    </div>
    <div className="hidden md:block w-px bg-[#1e3a8a] opacity-20"></div>
    <div className="flex items-center gap-2">
      <span className="font-bold">Secure Trust Account:</span> Your money is protected
    </div>
  </div>
);

const NavBar = () => {
  const { isLoggedIn, userEmail, logout } = React.useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="bg-white py-4 px-4 md:px-8 border-b flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <a href="/" className="text-2xl font-black text-[#1e3a8a] tracking-tighter" aria-label="On the Beach Home">
          <span className="bg-[#facc15] px-2 py-1 rounded-lg">On</span> the <br className="hidden md:block" /> Beach
        </a>
      </div>
      
      <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-[#1e3a8a]">
         <div className="flex items-center gap-4 border-r pr-6">
            <div className="font-black text-xl italic tracking-tighter text-[#1e3a8a]">ABTA</div>
            <div className="w-8 h-8 rounded-full border-2 border-[#1e3a8a] flex items-center justify-center font-bold text-xs">ATOL</div>
         </div>
        
        {isLoggedIn ? (
           <button onClick={logout} className="flex items-center gap-2 hover:text-blue-600 transition-colors bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
             <div className="w-6 h-6 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center text-xs">{userEmail.charAt(0).toUpperCase()}</div>
             <span className="max-w-[120px] truncate font-medium">{userEmail}</span>
           </button>
        ) : (
           <button onClick={() => setShowLogin(true)} className="flex items-center gap-1 hover:text-blue-600 transition-colors"><User size={18} /> Log in</button>
        )}
        <a href="#" className="flex items-center gap-1 hover:text-blue-600 transition-colors"><Briefcase size={18} /> My Bookings</a>
        <a href="#" className="flex items-center gap-1 hover:text-blue-600 transition-colors"><Heart size={18} /> Saved Holidays</a>
        <a href="#" className="flex items-center gap-1 hover:text-blue-600 transition-colors"><Clock size={18} /> Previous Searches</a>
        <button aria-label="Menu" className="ml-4"><Menu size={24} /></button>
      </div>
      
      <div className="flex lg:hidden items-center gap-4 text-[#1e3a8a]">
         {isLoggedIn ? (
             <button onClick={logout} className="w-8 h-8 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center text-sm font-bold">{userEmail.charAt(0).toUpperCase()}</button>
         ) : (
             <button onClick={() => setShowLogin(true)}><User size={24} /></button>
         )}
         <Menu size={24} />
      </div>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

const Breadcrumbs = () => (
  <nav className="px-4 md:px-8 py-4 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
    <a href="/" className="hover:underline">Home</a>
    <ChevronRight size={14} />
    <span className="text-gray-900 font-medium" aria-current="page">Contact_us</span>
  </nav>
);

const Hero = () => (
  <section className="px-4 md:px-8 mb-8">
    <h1 className="text-3xl font-bold text-[#1e3a8a] mb-4">Contact Us</h1>
    <div className="bg-[#facc15] rounded-xl overflow-hidden flex flex-col md:flex-row items-center relative min-h-[250px] shadow-sm">
      <div className="p-8 md:p-12 md:w-1/2 z-10 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-black text-[#1e3a8a] leading-tight mb-2">Contact us</h2>
        <p className="text-2xl md:text-3xl font-bold text-[#1e3a8a]">Get in touch, you <br />Smart Booker.</p>
      </div>
      <div className="w-full md:w-1/2 h-full absolute right-0 top-0 bottom-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' }}>
         <div className="absolute inset-0 bg-gradient-to-r from-[#facc15] via-[#facc15]/80 to-transparent"></div>
      </div>
    </div>
  </section>
);

const Intro = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="px-4 md:px-8 max-w-4xl mb-12 text-gray-800 leading-relaxed space-y-5 md:text-lg">
      <p>Hiya! 👋 You've reached On the Beach (try saying that after a few Fanta Lemons). We're an online-only bunch, which means two things:</p>
      <ol className="list-decimal pl-5 space-y-2 font-medium">
        <li>We're super hip and cool</li>
        <li>The easiest way to reach us is through our handy <strong className="text-gray-900">Live Chat</strong> feature.</li>
      </ol>
      <p>You can find this under the 'Help and Contact' section of your <a href="#" className="text-blue-600 hover:underline font-medium">My Bookings account</a>, and one of our beach buddies will be happy to help you on your way.</p>
      
      <div className="pt-4 pb-4">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="text-[#1e3a8a] font-black hover:text-blue-800 flex items-center gap-2 bg-[#facc15] px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          {showForm ? 'Hide Contact Form' : 'Use Alternative Contact Form'}
          <ChevronDown size={20} className={`transform transition-transform ${showForm ? 'rotate-180' : ''}`} />
        </button>
        
        {showForm && (
           <div className="animate-in slide-in-from-top-4 duration-300 fade-in mt-4">
              <ContactForm />
           </div>
        )}
      </div>

      <p className="mt-4 text-sm italic text-gray-500">For more details on how to reach us, have a nosy below...</p>
    </section>
  );
};

const AppPromo = () => (
  <section className="px-4 md:px-8 mb-12">
    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">How do I make a booking?</h2>
    <p className="text-gray-700 mb-8 max-w-4xl">Being an Online Travel Agent (or OTA for short) means we've got a super snazzy, super easy-to-use website and app where you can browse and book holidays in a jiffy. You can click below to find out more about our app and all its holiday-themed features 🤩</p>
    
    <div className="flex justify-center items-center py-8">
      {/* Abstract App Mockup */}
      <div className="relative w-full max-w-3xl flex justify-center items-end h-[400px]">
         {/* Decorative elements */}
         <div className="absolute top-10 left-10 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center transform -rotate-12">
            <span className="text-4xl">🤩</span>
         </div>
         <div className="absolute bottom-20 right-10 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12">
            <span className="text-3xl text-pink-600 font-black">££</span>
         </div>
         
         {/* Phones */}
         <div className="flex gap-4 md:gap-8 h-full items-end justify-center">
            {/* Phone 1 */}
            <div className="w-[160px] md:w-[200px] h-[85%] bg-white rounded-3xl border-[8px] border-gray-800 shadow-2xl overflow-hidden flex flex-col relative transform -rotate-6">
                <div className="h-6 bg-gray-800 w-1/2 mx-auto rounded-b-xl absolute top-0 left-1/4 z-20"></div>
                <div className="bg-blue-600 p-4 pt-8 text-white h-full">
                    <div className="font-bold mb-4">Holiday Finder</div>
                    <div className="space-y-2">
                        <div className="bg-white/20 h-8 rounded"></div>
                        <div className="bg-white/20 h-8 rounded"></div>
                        <div className="bg-white/20 h-8 rounded"></div>
                    </div>
                </div>
            </div>
            
            {/* Phone 2 (Center) */}
            <div className="w-[180px] md:w-[220px] h-full bg-white rounded-3xl border-[8px] border-gray-800 shadow-2xl overflow-hidden flex flex-col relative z-10">
                <div className="h-6 bg-gray-800 w-1/2 mx-auto rounded-b-xl absolute top-0 left-1/4 z-20"></div>
                <div className="bg-pink-100 h-2/5 flex items-center justify-center p-4">
                   <div className="bg-white w-full h-full rounded-xl shadow-sm flex flex-col items-center justify-center">
                      <div className="text-sm font-bold text-gray-500 mb-1">COUNTDOWN</div>
                      <div className="flex gap-2 text-center text-[#1e3a8a] font-black">
                         <div><div className="text-2xl">108</div><div className="text-[10px]">DAYS</div></div>
                         <div><div className="text-2xl">10</div><div className="text-[10px]">HOURS</div></div>
                      </div>
                   </div>
                </div>
                <div className="bg-white h-3/5 p-4 flex flex-col gap-2">
                   <div className="font-bold text-[#1e3a8a] text-sm">Customise your countdown</div>
                   <div className="flex gap-2 mt-2">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                   </div>
                </div>
            </div>

            {/* Phone 3 */}
            <div className="w-[160px] md:w-[200px] h-[85%] bg-white rounded-3xl border-[8px] border-gray-800 shadow-2xl overflow-hidden flex flex-col relative transform rotate-6">
                <div className="h-6 bg-gray-800 w-1/2 mx-auto rounded-b-xl absolute top-0 left-1/4 z-20"></div>
                <div className="h-2/5 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}></div>
                <div className="p-3">
                   <div className="h-4 bg-gray-200 w-3/4 rounded mb-2"></div>
                   <div className="h-3 bg-gray-100 w-full rounded mb-4"></div>
                   <div className="h-10 bg-[#facc15] rounded flex items-center justify-center text-[#1e3a8a] font-bold text-xs">Today's price</div>
                </div>
            </div>
         </div>
      </div>
    </div>
    
    <p className="text-sm italic text-gray-600 text-center max-w-3xl mx-auto mt-4">Top tip: Pssst! If you don't already have an account with us and you're looking to create one, remember to use the same email address you used to book your holiday. That way you can have all your handy holiday details tied to one account.</p>
  </section>
);

const StageCard = ({ title, image, desc }: { title: string, image: string, desc: string }) => (
  <a href="#" className="block group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="h-48 relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      <h3 className="absolute bottom-4 left-4 text-2xl font-black text-[#facc15] max-w-[150px] leading-tight">
        {title.split(' ').map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </h3>
    </div>
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-gray-900">{title}</h4>
        <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
    </div>
  </a>
);

const BookingStages = () => (
  <section className="px-4 md:px-8 mb-16">
    <div className="bg-pink-600 rounded-xl overflow-hidden flex flex-col md:flex-row items-center relative min-h-[160px] shadow-sm mb-8">
      <div className="p-6 md:p-10 md:w-1/2 z-10 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#facc15] leading-tight mb-4">Already got<br/>a booking?</h2>
        <div className="inline-block bg-white text-pink-600 font-bold px-4 py-2 rounded shadow-sm self-start flex items-center gap-2">
           No problem - check out our info below <span className="rotate-180 inline-block">👇</span>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full absolute right-0 top-0 bottom-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' }}>
         <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-pink-600/80 to-transparent"></div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StageCard 
        title="Know before you go" 
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        desc="Got a holiday booked but haven't travelled yet? Find out how to reach us if you need anything before you go."
      />
      <StageCard 
        title="While you're away" 
        image="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        desc="Already on your jollies? Don't worry, you can still get in touch with us while you're away."
      />
      <StageCard 
        title="Once you're home" 
        image="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        desc="Back home and need to reach us? Here's exactly how you can get in touch once you're back on home turf."
      />
    </div>
  </section>
);

const HelpHub = () => (
  <section className="px-4 md:px-8 mb-16">
    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">We're here to help</h2>
    <p className="text-gray-700 mb-8 max-w-4xl text-sm">Have you heard? We've got a <a href="#" className="text-blue-600 hover:underline">Help Centre</a> where we've answered all of your burning questions in one handy place. We've also pulled together a handy Holiday Help Hub (it's a lot easier to navigate than it is to say...), because while we might not have reps out in resort (the perks of being an online-only travel agent), it doesn't mean we aren't still with you every step of the way. Check them out below 👇</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="#" className="block group rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="h-64 bg-pink-500 relative p-8 flex flex-col justify-center overflow-hidden">
           <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}></div>
           <h3 className="relative z-10 text-4xl font-black text-white leading-tight">Got questions?<br/>We've got<br/>the answers</h3>
           <div className="absolute right-0 bottom-0 w-1/2 h-full bg-cover bg-right" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        </div>
        <div className="p-4 bg-white flex justify-between items-center text-[#1e3a8a] font-bold">
           Help Centre <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </a>
      
      <a href="#" className="block group rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="h-64 bg-blue-600 relative p-8 flex flex-col justify-center overflow-hidden">
           <h3 className="relative z-10 text-4xl font-black text-white leading-tight">Everything<br/>you want to<br/>know <span className="text-[#facc15]">before</span><br/><span className="text-[#facc15]">your jollies</span></h3>
           <div className="absolute right-0 bottom-0 w-1/2 h-full bg-cover bg-right" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        </div>
        <div className="p-4 bg-white flex justify-between items-center text-[#1e3a8a] font-bold">
           Holiday Help Hub <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </a>
    </div>
  </section>
);

const AccordionItem = ({ title, answer }: { title: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white hover:border-gray-300 transition-colors shadow-sm">
      <button 
        className="w-full px-6 py-4 flex justify-between items-center text-left font-bold text-[#1e3a8a]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown size={20} className={`transform transition-transform duration-200 text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 space-y-4">
          <p>{answer}</p>
          <div className="pt-3 border-t border-gray-100">
             <button 
               onClick={() => window.dispatchEvent(new CustomEvent('open-help-modal'))}
               className="text-[#1e3a8a] font-bold hover:underline flex items-center gap-1 text-sm bg-blue-50 px-4 py-2 rounded-lg"
             >
               <MessageCircle size={16} /> Chat with us for more support
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RefundSection = () => (
  <section className="px-4 md:px-8 mb-16 max-w-4xl mx-auto">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
         <PiggyBank size={48} className="text-[#1e3a8a]" />
      </div>
      <div>
        <h2 className="text-3xl font-black text-[#1e3a8a] mb-2 tracking-tight">Need a refund?</h2>
        <p className="text-gray-800 mb-6 text-base leading-relaxed">We understand that plans change. If your holiday was cancelled or you're entitled to a refund based on our terms and conditions, our team is here to help process it as quickly as possible. Please ensure you have your booking reference handy.</p>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-help-modal', { detail: { subject: 'refund' } }))}
          className="bg-[#1e3a8a] text-[#facc15] px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-sm flex items-center gap-2"
        >
          Request a Refund <ChevronRight size={18} />
        </button>
      </div>
    </div>
  </section>
);

const FAQs = () => {
  const [faqs, setFaqs] = useState<{title: string, answer: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      // Simulate API call to fetch FAQs
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFaqs([
        {
          title: "How do I contact you?",
          answer: "While we're an online-only travel agent and don't have call centres, our dedicated team is always ready to help! The absolute quickest and easiest way to reach us is by starting a live chat. We can sort out most things right there and then."
        },
        {
          title: "Can I make a change to my booking?",
          answer: "You sure can! While some simple changes can be made in 'My Bookings', the best way to ensure everything goes smoothly—especially for things like passenger details or major changes—is to chat with one of our specialists. We'll handle the heavy lifting for you."
        },
        {
          title: "How do I cancel my booking and what will it cost?",
          answer: "We're so sorry to hear you can't go on your jollies! Cancellations can be a bit tricky with varying airline and hotel fees. To get the clearest picture of your options and exact costs, we highly recommend jumping on a quick chat with our team before doing anything."
        },
        {
          title: "How do I check in for my flight?",
          answer: "Usually, you'll check in directly with your airline a few weeks before flying. However, if you're unsure about your specific airline's process or need help finding your reference numbers, our team is just a message away. Chat with us and we'll point you in the right direction!"
        },
        {
          title: "How do I check my balance/next instalment?",
          answer: "You can track your basic payment info in 'My Bookings'. But if you need to discuss payment plans, make special arrangements, or just want a detailed breakdown of what's due when, reaching out to our support team via chat is always your best bet."
        },
        {
          title: "What is my luggage allowance?",
          answer: "Luggage allowances depend completely on the airline you're flying with. Instead of hunting through airline terms and conditions, why not just ask us? Start a chat, and our friendly team will quickly confirm exactly what you're allowed to take."
        }
      ]);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  return (
    <section className="mb-16">
      <div className="px-4 md:px-8 mb-8">
         <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">Our most popular FAQs</h2>
         <div className="bg-blue-500 rounded-xl overflow-hidden relative min-h-[120px] flex items-center shadow-sm">
            <div className="p-8 z-10 flex gap-4 items-center">
               <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">Frequently<br/>asked<br/><span className="text-[#facc15]">questions</span></h3>
               <div className="w-16 h-16 md:w-20 md:h-20 bg-[#facc15] rounded-full flex items-center justify-center text-[#1e3a8a] text-4xl md:text-5xl font-black ml-4 md:ml-8 shadow-lg">?</div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
            {/* Decorative palms pattern abstract */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)' }}></div>
         </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 min-h-[300px]">
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse flex h-16 bg-gray-100 border border-gray-200 rounded-lg w-full"></div>
            ))}
          </div>
        ) : (
          faqs.map((faq, index) => (
            <AccordionItem key={index} title={faq.title} answer={faq.answer} />
          ))
        )}
      </div>
    </section>
  );
};

const TrustBadges = () => (
  <section className="px-4 md:px-8 mb-16 max-w-6xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      <div className="bg-[#1c64f2] text-white p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md">
         <div className="flex items-center gap-1 mb-2">
            <Star className="fill-[#00b67a] text-[#00b67a]" size={24} />
            <span className="font-bold text-xl">Trustpilot</span>
         </div>
         <div className="flex gap-1 mb-1">
             {[1,2,3,4].map(i => <div key={i} className="bg-[#00b67a] p-1 rounded-sm"><Star className="fill-white text-white" size={12} /></div>)}
             <div className="bg-[#00b67a] p-1 rounded-sm relative overflow-hidden"><Star className="fill-white text-white absolute" size={12} style={{ clipPath: 'inset(0 50% 0 0)'}} /></div>
         </div>
         <div className="text-[10px] opacity-90 mb-1">TrustScore <strong>3.9</strong> | <strong>94,431</strong> reviews</div>
         <div className="text-xs font-bold">We're trusted by our customers</div>
      </div>
      
      <div className="bg-[#2563eb] text-white p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md border border-blue-400/30">
        <ShieldCheck size={36} className="mb-2 text-[#facc15]" />
        <div className="font-bold text-sm uppercase leading-tight mb-1">Secure Trust<br/>Account</div>
        <div className="text-xs">Your money is protected</div>
      </div>
      
      <div className="bg-[#2563eb] text-white p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md border border-blue-400/30">
        <PiggyBank size={36} className="mb-2 text-[#facc15]" />
        <div className="font-bold text-sm mb-1">Deposits from £19pp</div>
        <div className="text-xs">Flexible payment plans</div>
      </div>
      
      <div className="bg-[#2563eb] text-white p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md border border-blue-400/30">
        <Palmtree size={36} className="mb-2 text-[#facc15]" />
        <div className="font-bold text-sm mt-2">The home of holiday perks</div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t pt-12 text-sm text-gray-600">
    <div className="bg-[#1e3a8a] text-white py-8 px-4 text-center">
      <div className="font-bold text-lg mb-6">Book with confidence with On the Beach</div>
      <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
         <div className="flex items-center gap-2">
            <span className="font-black text-3xl italic tracking-tighter">ABTA</span>
         </div>
         <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-lg">ATOL</div>
         <div className="flex items-center gap-2">
            <ShieldCheck size={32} />
            <div className="text-left leading-tight text-xs font-bold">SECURE<br/>TRUST<br/>ACCOUNT</div>
         </div>
      </div>
      <div className="mt-6">
         <a href="#" className="text-xs underline hover:text-gray-300">Read more about how you're protected</a>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
      <div>
        <h4 className="font-bold text-gray-900 mb-4">About</h4>
        <ul className="space-y-3">
          <li><a href="#" className="hover:underline hover:text-blue-600">About Us</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Investor Relations</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Privacy Notice</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Contact Us</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-gray-900 mb-4">More from us</h4>
        <ul className="space-y-3">
          <li><a href="#" className="hover:underline hover:text-blue-600">Help Centre</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Terms & Conditions</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Package Rights</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Cookie Policy</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Careers</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Gender Pay Gap Report</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Modern Slavery Act</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Accessibility Statement</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-gray-900 mb-4">Sitemaps</h4>
        <ul className="space-y-3">
          <li><a href="#" className="hover:underline hover:text-blue-600">Main</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Hotels</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Destinations</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-gray-900 mb-4">International Sites</h4>
        <ul className="space-y-3">
          <li><a href="#" className="hover:underline hover:text-blue-600">onthebeach.ie</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-gray-900 mb-4">Stay Safe</h4>
        <ul className="space-y-3">
          <li><a href="#" className="hover:underline hover:text-blue-600">Foreign Travel Advice</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Travel Updates</a></li>
          <li><a href="#" className="hover:underline hover:text-blue-600">Health & Safety</a></li>
        </ul>
        <div className="mt-6 flex flex-col font-bold">
           <span className="text-xl">travel</span>
           <span className="text-xl -mt-1">aware</span>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 py-6 border-t border-gray-200 flex flex-wrap justify-center gap-4 text-gray-400 items-center">
       {/* Payment Logos */}
       <div className="flex gap-4 items-center opacity-70 grayscale hover:grayscale-0 transition-all cursor-pointer">
          <svg className="h-5" viewBox="0 0 50 16" fill="currentColor"><path d="M21.84 0L20.21 15.65h-3.41L18.42 0h3.42zm11.75 0h-2.65c-.6 0-1.07.28-1.32.84l-5.07 11.95L22 0h-3.56l4.28 10.3-1.46 4.14c-.16.48.06.91.56.91h2.9l6.87-15.35zm-22.37 0L8.6 10.74 8.12 8.3C7.62 5.56 5.82 2.76 3.14 1.34L3.84 4c1.23 1 2.37 2.77 2.77 4.7l1.7 8.35h3.63L15.48 0h-4.26zM2.87 0C2.04.14.98.37 0 .68l.2 1.05c1.4-.48 2.5-.74 3.32-.82L2.87 0z"/></svg>
          <svg className="h-6" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="13" r="13" fill="#EB001B"/><circle cx="31" cy="13" r="13" fill="#F79E1B"/><path d="M22 21.6A13 13 0 0 1 22 4.4a13 13 0 0 1 0 17.2Z" fill="#FF5F00"/></svg>
          <svg className="h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.33 6.88H19.7c-.52 0-.96.34-1.12.83l-2.6 8.1h-1.4l2.64-8.12c.16-.5.6-.82 1.13-.82h3.62c.5 0 .84.44.75.92l-1.33 7.82h1.42l1.32-7.8h-1.4l-.5 2.95h-1.45l.5-2.95zm-15.14 0H4.62c-.52 0-.96.34-1.12.83L.9 15.8h1.43l1.83-5.64h1.72c2.04 0 3.35-1.04 3.73-2.94.3-1.48-.38-2.63-1.84-2.8l1.45-4.43zm-2.03 4.2H4.8l-.82 2.54h1.36c.92 0 1.5-.47 1.66-1.35.14-.66-.18-1.18-.84-1.18zm8.73-4.2h-3.62c-.52 0-.96.34-1.12.83l-2.6 8.1h1.4l2.64-8.12c.16-.5.6-.82 1.13-.82h3.62c.5 0 .84.44.75.92l-1.33 7.82h1.42l1.32-7.8h-1.4l-.5 2.95h-1.45l.5-2.95z"/></svg>
          <svg className="h-5 text-[#003087]" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.89l-1.12 7.115z" fill="#00457C"/><path d="M21.722 5.093c-.927-1.066-2.616-1.554-4.814-1.554H9.447c-.244 0-.45.178-.49.418L7.132 15.52a.647.647 0 0 0 .638.747h3.195c.524 0 .967-.382 1.05-.89l.865-5.494c.081-.508.525-.89 1.05-.89h1.034c3.315 0 5.989-1.385 6.643-5.467.03-.153.056-.312.078-.475.148-1.096.068-2.12-.963-2.958z" fill="#0079C1"/><path d="M19.141 9.943c-.886 4.546-4.522 6.008-8.528 6.008H8.42c-.524 0-.968.382-1.05.89l-1.118 7.115H2.47a.64.64 0 0 1-.633-.74l1.328-8.43h4.636c4.298 0 7.664-1.748 8.647-6.798l.076-.437c-.31.326-.78.71-1.378 1.054a8.163 8.163 0 0 1-4.005 1.34h-.97a2.22 2.22 0 0 0-2.195 1.865l-.837 5.321c-.027.17.1.32.274.32h3.195c1.464 0 2.822-.647 3.738-1.856.906-1.196 1.41-2.91 1.41-4.708 0-.317-.02-.635-.06-.946z" fill="#00457C"/></svg>
       </div>
       <div className="w-px h-4 bg-gray-300 mx-2 hidden md:block"></div>
       <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 text-gray-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" /></svg></a>
          <a href="#" className="hover:text-blue-600 text-gray-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
          <a href="#" className="hover:text-blue-600 text-gray-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
          <a href="#" className="hover:text-blue-600 text-gray-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22.04 7.02c.07-.63-.2-1.3-.7-1.74-.5-.45-1.22-.55-1.83-.24-2.13.88-4.32 1.5-6.57 2.03-2.02.48-4.05.9-6.12 1.12-1.12.1-2.22-.05-3.2-.56-.63-.33-1.08-.94-1.2-1.65-.13-.7.1-1.4.63-1.93.9-.9 2.05-1.55 3.3-1.92 1.6-.45 3.25-.72 4.9-.84 1.35-.1 2.7.02 4 .33.6.14 1.25.1 1.8-.18.6-.28 1-.84 1.07-1.5.07-.63-.2-1.3-.7-1.74-1.08-.94-2.44-1.42-3.86-1.52-2.3-.17-4.63-.03-6.9.43-1.9.38-3.77.96-5.55 1.72-1.2.53-2.3 1.23-3.22 2.1-1.25 1.18-1.96 2.82-1.95 4.5.02 1.54.78 3 2.06 4 1.23.94 2.76 1.46 4.3 1.58 2.04.16 4.1.03 6.13-.3 2-.3 4-.72 5.96-1.22 2-.5 4.02-1.14 6.06-1.56 1.8-.38 3.65-.63 5.48-.72.63-.03 1.24.22 1.67.7.43.48.6 1.1.48 1.74l-.4 3.7c-.12 1.17.65 2.2 1.8 2.37 1.16.16 2.24-.65 2.4-1.8l.42-3.95z" clipRule="evenodd"/></svg></a>
       </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 py-8 text-[10px] leading-relaxed text-gray-500 border-t border-gray-200">
      <h5 className="font-bold text-gray-900 text-xs mb-2">Online Travel Agent</h5>
      <p className="mb-4">
        On the Beach act as an agent providing a web search interface between you and various third party suppliers of travel products (e.g. flight, hotel or transfer). For flights we act as your agent in processing your booking with the airline; we are not the airline's agent. Each product you choose creates a separate contract between you and the supplier of that product.
      </p>
      <p className="mb-4">
        As an Online Travel Agent, we let you build your own holiday by giving you access to a wide range of cheap flights, hotels and transfer suppliers, saving you money. And it's great to know that when you book a package holiday (including a flight) through On the Beach, every part is financially protected by the ATOL scheme. On the Beach is also a member of ABTA which means you have the benefit of ABTA's assistance and Code of Conduct. Find out why you can book with confidence here. On the Beach Limited is an Accredited Body Member of On the Beach Travel Ltd (ATOL number 11549). Some of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all holidays and travel services listed on this website. This website will provide you with information on the protection that applies in the case of each holiday and travel service offered before you make your booking. If you do not receive an ATOL certificate then the booking will not be ATOL protected. If you do receive an ATOL certificate but all the parts of your trip are not listed on it, those parts will not be ATOL protected. Please see our booking conditions for further information or for more information about financial protection and the ATOL certificate go to <a href="#" className="underline">www.caa.co.uk</a>.
      </p>
      
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-100">
         <p>On the Beach Limited, 5 Adair Street, Manchester, England, M1 2NQ. Registered number: 03162982. VAT number: 918060141.</p>
         <p className="mt-2 md:mt-0">Copyright © 2007-2026 On the Beach Holidays</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const login = (email: string) => { setIsLoggedIn(true); setUserEmail(email); };
  const logout = () => { setIsLoggedIn(false); setUserEmail(''); };

  return (
    <AuthContext.Provider value={{isLoggedIn, userEmail, login, logout}}>
      <div className="min-h-screen bg-gray-50 font-sans selection:bg-[#facc15] selection:text-[#1e3a8a]">
        <TopBar />
        <NavBar />
        <main className="max-w-[1400px] mx-auto bg-white shadow-sm min-h-screen pb-12">
          <Breadcrumbs />
          <Hero />
          <Intro />
          <AppPromo />
          <BookingStages />
          <HelpHub />
          <FAQs />
          <RefundSection />
          <TrustBadges />
        </main>
        <FloatingHelp />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
