'use client'
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero"
import LandingAbout from "@/components/LandingAbout"
import Services from "@/components/Services"
import HorizontalScrollComponent from "@/components/HorizontalProjects"
// import Projects from "../components/Projects"
import Faq from "@/components/Faq"
import Testimonials from "@/components/Testimonials"
import BlogCards from "@/components/BlogCards"
import Footer from "@/components/Footer"
import Metadata from "@/components/Metadata"
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
              title="ScaleX - Your Partner in Digital Marketing"
              description="ScaleX combines AI-driven insights with expert marketing solutions to drive exponential business growth, spanning all stages of business from idea to implementation."
              twitterCard="summary_large_image"
            />
            <Hero />
            <LandingAbout />
            <Services />
            <HorizontalScrollComponent />
            {/* <Projects /> */}
            <Testimonials />
            <Faq />
            <BlogCards />
            <Footer />
        </>
    )
}

export default LandingPage;
