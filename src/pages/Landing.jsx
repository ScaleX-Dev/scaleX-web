import Hero from "../components/Hero"
import LandingAbout from "../components/LandingAbout"
import Services from "../components/Services"
import HorizontalScrollComponent from "../components/HorizontalProjects"
// import Projects from "../components/Projects"
import Faq from "../components/Faq"
import Testimonials from "../components/Testimonials"
import BlogCards from "../components/BlogCards"
import Footer from "../components/Footer"

const LandingPage = () =>{
    return(
        <>
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