import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Globe, ChevronRight, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ_DATA = [
  {
    id: "what-is-netflix",
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"
  },
  {
    id: "cost",
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts."
  },
  {
    id: "where-to-watch",
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles."
  },
  {
    id: "cancel",
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
  },
  {
    id: "what-to-watch",
    question: "What can I watch on Netflix?",
    answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
  },
  {
    id: "kids",
    question: "Is Netflix good for kids?",
    answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."
  }
];

interface FeatureRowProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

function FeatureRow({ title, description, image, reverse = false }: FeatureRowProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between py-16 px-8 md:px-24 border-b-8 border-[#232323] bg-black`}>
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-2xl font-medium text-gray-300">{description}</p>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img src={image} alt={title} className="max-w-full h-auto" referrerPolicy="no-referrer" />
      </div>
    </div>
  );
}

interface AccordionItemProps {
  key?: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="mb-2 w-full max-w-4xl mx-auto">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 md:p-6 bg-[#2d2d2d] hover:bg-[#414141] transition-colors text-left text-xl md:text-2xl"
      >
        <span>{question}</span>
        {isOpen ? <X size={32} /> : <Plus size={32} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#2d2d2d] mt-[1px]"
          >
            <div className="p-5 md:p-6 text-xl md:text-2xl border-t border-black">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Hero Section */}
      <header className="relative h-[70vh] md:h-[95vh] w-full border-b-8 border-[#232323]">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.8) 100%), url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0746f318356a/ef93d434-c299-4573-86e5-3f107ee30657/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')` 
          }}
        />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-4 md:px-12 py-6 max-w-7xl mx-auto">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix" 
            className="w-24 md:w-40"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={16} />
              <select className="bg-black/50 border border-gray-500 rounded px-8 py-1 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-white">
                <option>English</option>
                <option>हिन्दी</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white" size={16} />
            </div>
            <button 
              onClick={() => navigate("/profiles")}
              className="bg-[#e50914] hover:bg-[#c11119] text-white px-4 py-1.5 rounded font-medium text-sm transition-colors"
            >
              Sign In
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-80px)] text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Unlimited movies, TV shows and more.
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); navigate("/profiles"); }}
            className="flex flex-col md:flex-row w-full gap-2 md:gap-0 mt-2"
          >
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-grow bg-black/40 border border-gray-500 rounded-md md:rounded-r-none px-4 py-4 md:py-5 text-lg focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button className="bg-[#e50914] hover:bg-[#c11119] text-white px-6 py-4 md:py-5 rounded-md md:rounded-l-none font-bold text-xl md:text-2xl flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
              Get Started <ChevronRight size={28} />
            </button>
          </form>
        </div>
      </header>

      {/* Features Section */}
      <FeatureRow 
        title="Enjoy on your TV."
        description="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more."
        image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
      />
      <FeatureRow 
        title="Download your shows to watch offline."
        description="Save your favourites easily and always have something to watch."
        image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
        reverse
      />
      <FeatureRow 
        title="Watch everywhere."
        description="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
        image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
      />
      <FeatureRow 
        title="Create profiles for kids."
        description="Send kids on adventures with their favourite characters in a space made just for them—free with your membership."
        image="https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDp_5zZm964ClZ_9y0NLeS-u7B9Xm7SgmvBCyS9X_7W6Rz96-uY5-m799L5y9L5y9L5y9L5y9L5y9L5y9L.png?r=4f5"
        reverse
      />

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 border-b-8 border-[#232323]">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto mb-12">
          {FAQ_DATA.map((faq) => (
            <AccordionItem 
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaq === faq.id}
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
            />
          ))}
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg md:text-xl mb-4">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); navigate("/browse"); }}
            className="flex flex-col md:flex-row w-full gap-2 md:gap-0"
          >
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-grow bg-black/40 border border-gray-500 rounded-md md:rounded-r-none px-4 py-4 md:py-5 text-lg focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button className="bg-[#e50914] hover:bg-[#c11119] text-white px-6 py-4 md:py-5 rounded-md md:rounded-l-none font-bold text-xl md:text-2xl flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
              Get Started <ChevronRight size={28} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-24 max-w-7xl mx-auto text-gray-400">
        <p className="mb-8 hover:underline cursor-pointer">Questions? Call 000-800-919-1694</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Investor Relations</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Speed Test</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">Help Centre</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
            <a href="#" className="hover:underline">Legal Notices</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">Account</a>
            <a href="#" className="hover:underline">Ways to Watch</a>
            <a href="#" className="hover:underline">Corporate Information</a>
            <a href="#" className="hover:underline">Only on Netflix</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">Media Centre</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>

        <div className="relative inline-block mb-8">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <select className="bg-black border border-gray-500 rounded px-8 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-white">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>

        <p className="text-xs">Netflix India</p>
      </footer>
    </div>
  );
}
