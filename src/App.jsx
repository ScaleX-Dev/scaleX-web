import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing";
import AboutUs from "./pages/About";
import BlogPage from "./pages/Blogs";
import ProjectsPage from "./pages/Projects";
import ContactPage from "./pages/Contact";
import Login from "./pages/Login";
import BlogEditor from "./pages/BlogEditor";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/editor" element={<BlogEditor />} />
          </Route>
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;