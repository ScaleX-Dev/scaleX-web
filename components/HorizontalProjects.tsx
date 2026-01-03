'use client'
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const cardData = [
  {
    id: 1,
    category: "E-Commerce",
    title: "Pitlane Performance Store",
    content:
      "Full Stack E-Commerce solution for Pitlane Performance Store, including website development, branding, and digital marketing.",
    quote:
      "ScaleX's expertise in e-commerce transformed our online store, driving significant growth and customer engagement.",
    tags: ["UX/UI", "Branding", "Strategy"],
    stats: {
      followers: "50,500+",
      subtext1: "Reach within first month",
      engagement: "85%",
      subtext2: "Engagement Growth",
      return: "2.1x",
      subtext3: "Return on ad spend",
    },
    bgColor: "bg-gradient-to-br  from-black/80 to-black",
    highlightColor: "hover:bg-gray-600",
  },
  {
    id: 2,
    category: "Lead Generation",
    title: "Forge Fitness Studio",
    content:
      "Forge Fitness Studio approached ScaleX to build out an effective lead generation strategy and increase gym memberships.",
    quote:
      "Their insights amaze me weekly, revealing new possibilities I can't wait to act on.",
    tags: ["Lead Generation", "Branding", "Content Strategy", "Illustration"],
    stats: {
      followers: "15,000+",
      subtext1: "Reach within 1st month",
      engagement: "75/month",
      subtext2: "Gym Memberships Generated",
      return: "250%",
      subtext3: "Engagement Growth",
    },

    video:
      "https://res.cloudinary.com/drj8voqyf/video/upload/v1741641975/Render_Me_2nd_version_v8qfjd.mp4",
    thumbnail:
      "https://res.cloudinary.com/drj8voqyf/video/upload/w_1000,h_800,c_fill,so_13.5/Render_Me_2nd_version_v8qfjd.jpg",
    bgColor: "bg-primary-green",
    textColor: "text-black",
    highlightColor: "hover:bg-gray-600 hover:text-white ",
  },
  {
    id: 3,
    category: "SEO Optimization",
    title: "Magnate Shipping",
    content:
      "Magnate Shipping partnered with ScaleX to enhance their SEO rankings, optimize paid advertising campaigns, and improve web traffic.",
    quote:
      "Partnering with ScaleX was a game-changer. Their technical expertise and insights were exactly what we needed.",
    tags: ["Branding", "SEO", "Web Development", "PPC"],
    stats: {
      followers: "270,000+",
      subtext1: "Reach",
      engagement: "85%",
      subtext2: "Engagement Growth",
      return: "120",
      subtext3: "Leads Generated",
    },

    video:
      "https://res.cloudinary.com/drj8voqyf/video/upload/v1744869211/Final_1_s1kn1h.mp4",
    thumbnail:
      "https://res.cloudinary.com/drj8voqyf/video/upload/w_1000,h_800,c_fill,so_38.5/Final_1_s1kn1h.jpg",

    bgColor: "bg-gradient-to-br  from-black/80 to-black",
    highlightColor: "hover:bg-gray-600",
  },
  {
    id: 4,
    category: "Learning Environment",
    title: "Project Enrich",
    content:
      "Project Enrich partnered with ScaleX to expand their remote coaching platform, making education more accessible worldwide. During Covid-19, ScaleX seamlessly integrated with our team, becoming an indispensable partner in our mission.",
    quote:
      "ScaleX seamlessly integrated with our team, making them an invaluable partner in expanding our remote coaching platform.",
    tags: ["UX/UI", "Branding", "Strategy"],
    stats: {
      followers: "20,000",
      subtext1: "Reach within 2 months",
      engagement: "185%",
      subtext2: "Engagement Growth",
      return: "2.5x",
      subtext3: "Return on ad spend",
    },
    video:
      "https://res.cloudinary.com/drj8voqyf/video/upload/v1741641974/Third_15_secs_rr6vt2.mp4",
    thumbnail:
      "https://res.cloudinary.com/drj8voqyf/video/upload/w_1000,h_800,c_fill,so_5.5/Third_15_secs_rr6vt2.jpg",
    bgColor: "bg-primary-green",
    textColor: "text-black",
    highlightColor: "hover:bg-gray-600 hover:text-white",
  },

  {
    id: 5,
    category: "Web Development",
    title: "Lahiru Marine Solutions",
    content:
      "Lahiru Marine Solutions partnered with ScaleX to enhance their online presence and streamline their operations through a custom web solution.",
    quote:
      "ScaleX seamlessly integrated with our team, making them an invaluable partner in expanding our marine services platform.",
    tags: ["UX/UI", "Branding", "Strategy"],
    stats: {
      followers: "60,000",
      subtext1: "Reach within 3 months",
      engagement: "135%",
      subtext2: "Engagement Growth",
      return: "1.8x",
      subtext3: "Return on ad spend",
    },
    bgColor: "bg-gradient-to-br  from-black/80 to-black",

    highlightColor: "hover:bg-gray-600",
  },
];

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    title: string;
    content: string;
    quote: string;
    tags: string[];
    stats: {
        followers: string;
        subtext1: string;
        engagement: string;
        subtext2: string;
        return: string;
        subtext3: string;
    };
    thumbnail?: string;
    video?: string;
}

const Modal = ({
  isOpen,
  onClose,
  category,
  title,
  content,
  quote,
  tags,
  stats,
  thumbnail,
  video,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#111111d2] flex items-center justify-center p-2 sm:p-4 z-100 pt-6 sm:pt-10"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[100vh] w-full max-w-[95vw] sm:max-w-3xl"
          >
            <div className="flex flex-col">
              {/* Video Thumbnail */}
              {video && thumbnail && (
                <div
                  className="relative w-full h-40 sm:h-64 bg-cover bg-center rounded-t-2xl cursor-pointer"
                  style={{ backgroundImage: `url("${thumbnail}")` }}
                  onClick={() => window.open(video, "_blank")}
                >
                  <div className="absolute inset-0 bg-black/40 rounded-t-2xl flex items-center justify-center hover:bg-black/50 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="w-10 h-10 sm:w-12 sm:h-12 opacity-80 hover:opacity-100"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Modal Content */}
              <div className="w-full p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="inline-block bg-black text-primary-green text-[11px] sm:text-[12px] px-2 sm:px-3 py-1 rounded-full mb-3">
                      {category}
                    </span>
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-black text-xl sm:text-2xl font-bold"
                      aria-label="Close modal"
                    >
                      &times;
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800">
                    {title}
                  </h2>

                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    {content}
                  </p>

                  {quote && (
                    <blockquote className="border-l-4 border-primary-green pl-3 sm:pl-4 italic text-gray-500 mt-4 text-sm sm:text-base">
                      "{quote}"
                    </blockquote>
                  )}

                  {tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-green text-black text-xs font-semibold px-2 sm:px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {stats && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center text-xs sm:text-sm">
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-black">
                        {stats.followers}
                      </div>
                      <div className="text-gray-500">{stats.subtext1}</div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-black">
                        {stats.engagement}
                      </div>
                      <div className="text-gray-500">{stats.subtext2}</div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-black">
                        {stats.return}
                      </div>
                      <div className="text-gray-500">{stats.subtext3}</div>
                    </div>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="mt-6 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded w-full transition-colors text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HorizontalScrollComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
      className="p-4 sm:p-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        className="text-center"
      >
        <h1 className="text-[48px] font-medium">Real Clients. Real Results.</h1>
        <p className="text-grey mb-10">
          We have assembled a powerhouse team of over 25+ marketers, developers,
          and strategists, ensuring top-tier support to achieve our clients'
          goals.
        </p>
      </motion.div>

      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => {
            document
              .getElementById("scrollContainer")
              ?.scrollBy({ left: -300, behavior: "smooth" });
          }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 sm:-translate-x-8 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div
          id="scrollContainer"
          className="flex overflow-x-auto space-x-4 sm:space-x-6 py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          {cardData.map((card, index) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 w-60 h-80 sm:w-72 sm:h-96 rounded-lg p-6 flex flex-col justify-between cursor-pointer shadow-lg transition-all duration-300 ease-in-out ${
                card.bgColor
              } ${card.highlightColor} ${card.textColor || "text-white"}`}
            >
              <div>
                <span className="inline-block bg-black text-primary-green text-[12px] px-3 py-1 rounded-full mb-3">
                  {card.category}
                </span>
                <h3 className="text-xl sm:text-3xl font-medium">
                  {card.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="inline-block bg-black bg-opacity-20 px-3 py-1 rounded-full text-sm !text-white">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => {
            document
              .getElementById("scrollContainer")
              ?.scrollBy({ left: 300, behavior: "smooth" });
          }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 sm:translate-x-8 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {selectedCard && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={selectedCard.title}
          content={selectedCard.content}
          category={selectedCard.category}
          quote={selectedCard.quote}
          tags={selectedCard.tags}
          stats={selectedCard.stats}
          video={selectedCard.video}
          thumbnail={selectedCard.thumbnail}
        />
      )}
    </motion.div>
  );
};

export default HorizontalScrollComponent;
