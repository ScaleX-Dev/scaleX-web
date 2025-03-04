import Hero from "../components/Hero"
import LandingAbout from "../components/LandingAbout"
import Projects from "../components/Projects"
import Faq from "../components/Faq"
import Testimonials from "../components/Testimonials"
import BlogCards from "../components/BlogCards"
import Footer from "../components/Footer"

const LandingPage = () =>{
    return(
        <>
            <Hero />
            <LandingAbout />
            <Projects />
            <Testimonials />
            <Faq />
            <BlogCards />
            <Footer />
        </>
    )
}


export default LandingPage;