import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Play } from "lucide-react";

const clients = [
  {
    category: "Learning Environment",
    title: "Project Enrich",
    description:
      "Project Enrich partnered with ScaleX to expand their remote coaching platform, making education more accessible worldwide. During Covid-19, ScaleX seamlessly integrated with our team, becoming an indispensable partner in our mission.",
    quote:
      "ScaleX seamlessly integrated with our team, making them an invaluable partner in expanding our remote coaching platform.",
    tags: ["Branding", "Development", "Animation", "Illustration"],
    stats: { followers: "200K+", engagement: "350%", return: "5X" },
    video: "../assets/forge.mp4",
  },
  {
    category: "SEO Optimization",
    title: "Magnate Shipping",
    description:
      "Magnate Shipping partnered with ScaleX to enhance their SEO rankings, optimize paid advertising campaigns, and improve web traffic.",
    quote:
      "Partnering with ScaleX was a game-changer. Their technical expertise and insights were exactly what we needed.",
    tags: ["Branding", "Development", "Animation", "Illustration"],
    stats: { followers: "200K+", engagement: "350%", return: "5X" },
    video: "../assets/forge.mp4",
  },
  {
    category: "Lead Generation",
    title: "Forge Fitness Studio",
    description:
      "Forge Fitness Studio approached ScaleX to build out an effective lead generation strategy and increase gym memberships.",
    quote:
      "Their insights amaze me weekly, revealing new possibilities I can't wait to act on.",
    tags: ["Branding", "Development", "Animation", "Illustration"],
    stats: { followers: "200K+", engagement: "350%", return: "5X" },
    video: "../assets/forge.mp4",
  },
];

export default function ClientResults() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const openModal = (video) => {
    setCurrentVideo(video);
    setIsOpen(true);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-[48px] font-medium text-center">
        Real Clients. Real Results.
      </h2>
      <p className="text-center text-grey mb-10">
        We have assembled a powerhouse team of over 25+ marketers, developers, and strategists,
        ensuring top-tier support to achieve our clients' goals.
      </p>
      <div className="grid gap-10">
        {clients.map((client, index) => (
          <div
            key={index}
            className={` p-6 rounded-xl flex flex-col sm:flex-row items-center ${index % 2 === 0 ? '' : 'sm:flex-row-reverse'}`}
          >
            <div className={`flex-1 sm:w-6/10 w-full ${index % 2 === 0 ? 'sm:pr-6' : 'sm:pl-6'} sm:pr-6 sm:pl-0 pl-0 mb-6 sm:mb-0`}>
              <span className="inline-block bg-black text-primary-green text-sm px-3 py-1 rounded-full mb-3">
                {client.category}
              </span>
              <h3 className="text-4xl font-medium mb-4">{client.title}</h3>
              <p className="text-gray-600 mb-4 text-[14px]">{client.description}</p>
              <blockquote className="italic border-l-4 border-black pl-3 mb-4 text-[20px]">
                "{client.quote}"
              </blockquote>
              <div className="flex flex-wrap gap-2 mb-4">
                {client.tags.map((tag, i) => (
                  <span key={i} className="text-sm px-2 py-1/2 rounded-full border-black border-1">
                    • {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex flex-col items-center p-5 rounded-xl bg-black">
                  <span className="font-regular text-2xl text-white">{client.stats.followers}</span>
                  <span className="text-xs text-grey">Followers in 3 months</span>
                </div>
                <div className="flex flex-col items-center p-5 rounded-xl bg-black">
                  <span className="font-regular text-2xl text-white">{client.stats.engagement}</span>
                  <span className="text-xs text-grey">Engagement growth</span>
                </div>
                <div className="flex flex-col items-center p-5 rounded-xl bg-black">
                  <span className="font-regular text-2xl text-white">{client.stats.return}</span>
                  <span className="text-xs text-grey">Return on ad spend</span>
                </div>
              </div>
            </div>

            <div className="relative sm:w-4/10 w-full h-full bg-gray-300 flex items-center justify-center rounded-xl cursor-pointer" onClick={() => openModal(client.video)}>
              <Play size={50} className="text-white bg-black p-2 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
          <button className="absolute top-7 right-7 text-white" onClick={() => setIsOpen(false)}>✕</button>
          {currentVideo && (
            <video controls className="w-full rounded-lg">
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </Dialog>
    </section>
  );
}
