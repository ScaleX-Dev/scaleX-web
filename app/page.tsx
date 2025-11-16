'use client'
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

const LandingPage = () =>{
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
