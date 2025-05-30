import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing";
import AboutUs from "./pages/About";
import BlogPage from "./pages/Blogs";
import Blog from "./pages/Blog";
import ProjectsPage from "./pages/Projects";
import ContactPage from "./pages/Contact";
import AppointmentScheduler from "./pages/Appointments";
import Login from "./pages/Login";
import BlogEditor from "./pages/BlogEditor";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";

import Metadata from "./components/Metadata";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Metadata
                  title="ScaleX - Your Partner in Digital Marketing"
                  description="ScaleX combines AI-driven insights with expert marketing solutions to drive exponential business growth, spanning all stages of business from idea to implementation."
                  twitterCard="summary_large_image"
                />
                <LandingPage />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Metadata
                  title="About Us - ScaleX"
                  description="At Scalex, our journey began with a group of college freelancers. Since then, we've grown our business, expanded our team, and diversified our portfolio. Central to our evolution has been our unwavering passion for data and creativity, empowering us to solve problems for our clients in our sleep."
                />
                <AboutUs />
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <Metadata
                  title="Blogs - ScaleX"
                  description="Read the latest insights, tips, and news from the ScaleX digital marketing team."
                />
                <BlogPage />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Metadata
                  title="Blog - ScaleX"
                  description="Detailed blog post from ScaleX. Stay updated with our latest articles."
                />
                <Blog />
              </>
            }
          />
          <Route
            path="/projects"
            element={
              <>
                <Metadata
                  title="Projects - ScaleX"
                  description="Explore our portfolio of successful digital marketing projects at ScaleX."
                />
                <ProjectsPage />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Metadata
                  title="Contact Us - ScaleX"
                  description="Get in touch with ScaleX for your digital marketing needs."
                />
                <ContactPage />
              </>
            }
          />
          <Route
            path="/appointments"
            element={
              <>
                <Metadata
                  title="Book an Appointment - ScaleX"
                  description="Schedule a meeting with the ScaleX team to discuss your business growth."
                />
                <AppointmentScheduler />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Metadata
                  title="Login - ScaleX"
                  description="Login to your ScaleX account to access exclusive features."
                />
                <Login />
              </>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/editor"
              element={
                <>
                  <Metadata
                    title="Blog Editor - ScaleX"
                    description="Create and edit blog posts for the ScaleX website."
                  />
                  <BlogEditor />
                </>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <>
                <Metadata
                  title="ScaleX - Your Partner in Digital Marketing"
                  description="ScaleX combines AI-driven insights with expert marketing solutions to drive exponential business growth, spanning all stages of business from idea to implementation."
                />
                <LandingPage />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
