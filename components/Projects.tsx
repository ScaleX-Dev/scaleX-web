'use client'
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Play } from "lucide-react";
import Image from "next/image";

const clients = [
  {
    category: "Learning Environment",
    title: "Project Enrich",
    description:
      "Project Enrich partnered with ScaleX to expand their remote coaching platform, making education more accessible worldwide. During Covid-19, ScaleX seamlessly integrated with our team, becoming an indispensable partner in our mission.",
    quote:
      "ScaleX seamlessly integrated with our team, making them an invaluable partner in expanding our remote coaching platform.",
    tags: ["UX/UI", "Branding", "Strategy"],
    stats: { followers: "20,000", subtext1: "followers within 2 months", engagement: "185%", subtext2: "Engagement Growth", return: "2.5x", subtext3: "Return on ad spend" },
    video:
      "https://res.cloudinary.com/drj8voqyf/video/upload/v1741641974/Third_15_secs_rr6vt2.mp4",
    thumbnail:
      "https://res.cloudinary.com/drj8voqyf/video/upload/w_1000,h_800,c_fill,so_5.5/Third_15_secs_rr6vt2.jpg",
  },
  {
    category: "SEO Optimization",
    title: "Magnate Shipping",
    description:
      "Magnate Shipping partnered with ScaleX to enhance their SEO rankings, optimize paid advertising campaigns, and improve web traffic.",
    quote:
      "Partnering with ScaleX was a game-changer. Their technical expertise and insights were exactly what we needed.",
    tags: ["Branding", "SEO", "Web Development", "PPC"],
    stats: { followers: "270,000+", subtext1: "followers", engagement: "85%",  subtext2: "Engagement Growth",  return: "120", subtext3: "Leads Generated" },

    video: "https://res.cloudinary.com/drj8voqyf/video/upload/v1744869211/Final_1_s1kn1h.mp4",
    thumbnail:
      "https://res.cloudinary.com/drj8voqyf/video/upload/w_1000,h_800,c_fill,so_38.5/Final_1_s1kn1h.jpg",
  },
  {
    category: "Lead Generation",
    title: "Forge Fitness Studio",
    description:
      "Forge Fitness Studio approached ScaleX to build out an effective lead generation strategy and increase gym memberships.",
    quote:
      "Their insights amaze me weekly, revealing new possibilities I can't wait to act on.",
    tags: ["Lead Generation", "Branding", "Content Strategy", "Illustration"],
    stats: { followers: "15,000+",subtext1: "followers within 1st month",  engagement: "75/month", subtext2: "Gym Memberships Generated", return: "250%", subtext3: "Engagement Growth" }, 

    video:
      "https://res.cloudinary.com/drj8voqyf/video/upload/v1741641975/Render_Me_2nd_version_v8qfjd.mp4",
    thumbnail:
      "https://res.cloudinary.com/drj8voqyf/video/upload/w_1000,h_800,c_fill,so_13.5/Render_Me_2nd_version_v8qfjd.jpg",
  },
];

export default function ClientResults() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const openModal = (video: string) => {
    setCurrentVideo(video);
    setIsOpen(true);
  };

  return (
    <section className="w-full px-4 py-10">
      <h2 className="text-[48px] font-medium text-center">
        Real Clients. Real Results.
      </h2>
      <p className="text-center text-grey mb-10">
        We have assembled a powerhouse team of over 25+ marketers, developers,
        and strategists, ensuring top-tier support to achieve our clients'
        goals.
      </p>
      <div className="grid gap-10">
        {clients.map((client, index) => (
          <div
            key={index}
            className={` sm:p-6 rounded-xl flex flex-col sm:flex-row items-center ${
              index % 2 === 0 ? "" : "sm:flex-row-reverse"
            }`}
          >
            <div
              className={`flex-1 sm:w-3/5 w-full ${
                index % 2 === 0 ? "sm:pr-6" : "sm:pl-6"
              } sm:pr-6 sm:pl-0 pl-0 mb-6 sm:mb-0`}
            >
              <span className="inline-block bg-black text-primary-green text-sm px-3 py-1 rounded-full mb-3">
                {client.category}
              </span>
              <h3 className="text-4xl font-medium mb-4">{client.title}</h3>
              <p className="text-gray-600 mb-4 text-[14px]">
                {client.description}
              </p>
              <blockquote className="italic border-l-4 border-black pl-3 mb-4 text-[20px]">
                "{client.quote}"
              </blockquote>
              <div className="flex flex-wrap gap-2 mb-4">
                {client.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-sm px-2 py-1/2 rounded-full border-black border-1 bg-primary-green"
                  >
                    • {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4">
                <div className="flex flex-col items-center p-5 rounded-xl bg-black">
                  <span className="font-regular text-2xl text-white">
                    {client.stats.followers}
                  </span>
                  <span className="text-xs text-grey">
                    {client.stats.subtext1}
                  </span>
                </div>
                <div className="flex flex-col items-center p-5 rounded-xl bg-black">
                  <span className="font-regular text-2xl text-white">
                    {client.stats.engagement}
                  </span>
                  <span className="text-xs text-grey">{client.stats.subtext2}</span>
                </div>
                <div className="flex flex-col items-center p-5 rounded-xl bg-black">
                  <span className="font-regular text-2xl text-white">
                    {client.stats.return}
                  </span>
                  <span className="text-xs text-grey">{client.stats.subtext3}</span>
                </div>
              </div>
            </div>

            <div
              className={`bg-black relative sm:w-2/5 w-full h-full flex items-center justify-center rounded-xl cursor-pointer`}
              onClick={() => openModal(client.video)}
            >
              <Image
                src={client.thumbnail}
                alt={client.title}
                className="w-full h-full object-cover rounded-xl opacity-70"
                width={1000}
                height={800}
              />
              <Play
                size={50}
                className="text-black absolute bg-white p-2 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/90 bg-opacity-30 z-150"
      >
        <div className="bg-white rounded-lg shadow-lg max-h-screen max-w-3/4 overflow-hidden relative flex flex-col">
          <button
            className="absolute top-7 right-7 text-black z-200 bg-white p-2 px-4 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          {currentVideo && (
            <video
              controls
              className="w-full h-screen object-contain rounded-lg"
              autoPlay
            >
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </Dialog>
    </section>
  );
}
