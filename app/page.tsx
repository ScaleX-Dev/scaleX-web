'use client'
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import ProcessPath from "@/components/ProcessPath";
import Services from "@/components/Services";
import FieldNotes from "@/components/FieldNotes";
import TwoWays from "@/components/TwoWays";
import ConversationCTA from "@/components/ConversationCTA";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const LandingPage = () =>{
    const scrollTrackedRef = useRef<Set<number>>(new Set());

    useEffect(() => {
        captureUTM();
        trackEvent("page_view", {
            page: "home",
            title: "ScaleX - Your Partner in Digital Marketing"
        });

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const button = target.closest('button, a');
            if (button) {
                trackEvent("click", {
                    element: button.tagName.toLowerCase(),
                    text: button.textContent?.trim() || '',
                    href: button.getAttribute('href'),
                    page: "home"
                });
            }
        };

        const handleScroll = () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            [25, 50, 75, 100].forEach((milestone) => {
                if (scrollPercentage >= milestone && !scrollTrackedRef.current.has(milestone)) {
                    scrollTrackedRef.current.add(milestone);
                    trackEvent("scroll_depth", { depth: milestone, page: "home" });
                }
            });
        };

        document.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <>
            <Metadata
              title="ScaleX — Marketing, Branding & Design"
              description="We are a World-Class marketing, branding, and design partner for B2B and B2C service businesses across Sri Lanka and the UAE. Built to close the gap between the business and how it shows up online."
              twitterCard="summary_large_image"
            />
            <Hero />
            <Clients />
            <Services />
            <ProcessPath />
            <FieldNotes />
            <TwoWays />
            <ConversationCTA />
            <Footer />
        </>
    )
}

export default LandingPage;
