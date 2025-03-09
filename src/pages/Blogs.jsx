import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db, collection, getDocs } from "../firebaseConfig";

const BlogPage = () => {
  const [openCard, setOpenCard] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id, // Added document ID
          ...doc.data(),
        }));

        const updatedBlogPosts = blogList.map((post, index) => ({
          ...post,
          dark: index % 2 === 1,
          imageStyle: {
            top: index % 2 === 0 ? "-300px" : "-50px",
            width: index % 2 === 0 ? "100%" : "110%",
            left: index % 2 === 0 ? "0" : "-20px",
          },
        }));

        setBlogPosts(updatedBlogPosts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blog posts");
      }
    };

    fetchBlogs();
  }, []);

  // Loading and error states
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (blogPosts.length === 0)
    return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        id="app-store"
        className="w-full max-w-[1200px] mx-auto flex flex-col py-[150px] md:px-0 px-2.5 flex-grow"
      >
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-[34px] font-semibold tracking-[-0.5px] text-gray-900">
            Blogs for you
          </h2>
        </header>

        <ul className="flex flex-wrap gap-5 md:gap-[20px]">
          {blogPosts.map((post, index) => (
            <li
              key={post.id || index} // Use document ID if available
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
                  <img
                    className="absolute object-cover w-full h-full"
                    src={post.image}
                    alt={post.title || "Blog post cover"}
                    style={post.imageStyle}
                    loading="lazy" // Added for performance
                  />
                </div>
                <div className="absolute top-4 left-4 max-w-[300px]">
                  <span className="block text-sm uppercase font-medium">
                    {post.category || "Uncategorized"}
                  </span>
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {post.title || "Untitled"}
                  </h2>
                </div>
                <button
                  className="absolute inset-0 z-10"
                  onClick={() => setOpenCard(index)}
                  aria-label={`Open ${post.title || "blog post"}`}
                />
              </div>
            </li>
          ))}
        </ul>

        {openCard !== null && (
          <>
            <div
              className="fixed inset-0 bg-black/80 z-[1000000]"
              onClick={() => setOpenCard(null)}
              aria-label="Close modal"
            />
            <div className="fixed inset-0 z-[1000001] flex items-center justify-center p-4 md:p-0">
              <div className="relative max-w-[700px] w-full max-h-[90vh] mx-auto rounded-[20px] overflow-y-auto bg-gray-100">
                <div className="h-[420px] relative">
                  <img
                    className="absolute w-full object-cover h-full"
                    src={blogPosts[openCard].image}
                    alt={blogPosts[openCard].title || "Blog post cover"}
                    style={blogPosts[openCard].imageStyle}
                  />
                </div>
                <div className="absolute top-8 left-8 max-w-[300px] text-white">
                  <span className="block text-sm uppercase font-medium">
                    {blogPosts[openCard].category || "Uncategorized"}
                  </span>
                  <h2 className="text-xl font-semibold">
                    {blogPosts[openCard].title || "Untitled"}
                  </h2>
                </div>
                {blogPosts[openCard].content && (
                  <div className="p-9 text-gray-900">
                    {Array.isArray(blogPosts[openCard].content) ? (
                      blogPosts[openCard].content.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-lg mb-4"
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ))
                    ) : (
                      <p
                        className="text-lg mb-4"
                        dangerouslySetInnerHTML={{
                          __html: blogPosts[openCard].content,
                        }}
                      />
                    )}
                  </div>
                )}
                <button
                  className="absolute top-4 right-4 text-white"
                  onClick={() => setOpenCard(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
