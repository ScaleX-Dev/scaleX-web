import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const blogCollection = collection(db, "blogs");

    const unsubscribe = onSnapshot(
      blogCollection,
      (snapshot) => {
        const blogList = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
          dark: index % 2 === 1,
          imageStyle: {
            top: index % 2 === 0 ? "-300px" : "-50px",
            width: index % 2 === 0 ? "100%" : "110%",
            left: index % 2 === 0 ? "0" : "-20px",
          },
        }));
        setBlogPosts(blogList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blog posts");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const openBlog = (post) => {
    navigate(`/blog?id=${post.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#646464] to-[#00ff81] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <main className="w-full max-w-[1200px] mx-auto flex flex-col py-[150px] md:px-0 px-2.5 flex-grow">
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-[34px] font-semibold tracking-[-0.5px] text-gray-900">
            Blogs for you
          </h2>
        </header>

        {error && <div className="text-center py-20 text-red-500">{error}</div>}
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <Navbar />
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-green border-solid"></div>
          </div>
        )}
        {!loading && !error && blogPosts.length > 0 && (
          <ul className="flex flex-wrap gap-5 md:gap-[20px]">
            {blogPosts.map((post, index) => (
              <li
                key={post.id}
                className={`relative flex-none w-full sm:w-[40%] h-[420px] ${
                  index % 4 === 0 || index % 4 === 3
                    ? "md:w-[calc(60%-20px)]"
                    : "md:w-[calc(40%-20px)]"
                } ${post.dark ? "text-white" : ""}`}
              >
                <div
                  className={`relative w-full h-full rounded-[20px] overflow-hidden ${
                    post.dark ? "bg-black" : "bg-gray-100"
                  }`}
                >
                  <div className="card-image-container h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-transparent"></div>
                    <img
                      className="object-cover w-full h-full"
                      src={post.coverImageUrl}
                      alt={post.title || "Blog post cover"}
                      style={post.imageStyle}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-4 left-4 text-white">
                    <span className="block text-sm uppercase font-regular text-primary-green w-auto">
                      {post.category || "Uncategorized"}
                    </span>
                    <h2 className="text-2xl font-medium line-clamp-2 pr-3">
                      {post.title || "Untitled"}
                    </h2>
                  </div>
                  <button
                    className="absolute inset-0 z-10"
                    onClick={() => openBlog(post)}
                    aria-label={`Open ${post.title || "blog post"}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
