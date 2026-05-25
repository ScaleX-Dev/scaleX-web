'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  {
    logo: "/assets/gallina-logo.png",
    name: "Gallina Innovations",
    type: "Architecture practice. Thirty years in business.",
    problem:
      "Three decades of legacy work behind a digital presence that did not carry the same weight.",
  },
  {
    logo: "/assets/magnate-logo.png",
    name: "Magnate Yachts",
    type: "Sri Lanka's leading yacht management agency. Handles 80% of yacht and superyacht arrivals into the country.",
    problem:
      "A category-leading position in-market, a website that had not been built to reflect it.",
  },
  {
    logo: "/assets/flourdude-logo.png",
    name: "Flour Dude",
    type: "Five-star rated café and bakery.",
    problem:
      "The product had a five-star reputation. The marketing voice could have belonged to any café.",
  },
];

const Clients = () => {
  return (
    <section className="bg-[#FAFAFA] px-6 md:px-16 lg:px-24 py-24 max-w-screen-xl mx-auto w-full">
      <motion.h2
        className="text-3xl md:text-4xl font-medium text-black mb-12 max-w-lg leading-snug"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Leading businesses that trusted us with the same problem.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {clients.map((client, i) => (
          <motion.div
            key={client.name}
            className="group/client border border-black/10 rounded-2xl p-6 bg-white hover:border-[#00ff81]/40 hover:shadow-[0_0_25px_-5px_rgba(0,255,129,0.15)] transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          >
            {/* Subtle glow circle top right */}
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#00ff81] opacity-0 group-hover/client:opacity-10 filter blur-xl transition-all duration-550 pointer-events-none" />
            {/* Logo placeholder */}
            <div className="h-16 flex items-center mb-5">
              <div className="h-10 w-32 bg-black/5 rounded-lg flex items-center justify-center">
                <span className="text-xs text-black/30 font-medium">Logo: {client.name}</span>
              </div>
            </div>
            <h3 className="text-base font-semibold text-black mb-1">{client.name}</h3>
            <p className="text-xs text-black/50 mb-4 leading-relaxed">{client.type}</p>
            <p className="text-sm text-black/70 leading-relaxed">{client.problem}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
