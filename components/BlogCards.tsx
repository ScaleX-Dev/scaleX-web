'use client'
import React, { useEffect, useState } from "react";

import Link from "next/link";

interface Blog {
    id: string;
    readTime: number;
    title: string;
    content: string;
    createdAt: string;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data: Blog[]) => {
        setBlogs(data.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching blogs: ", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 px-8 md:px-20 bg-gradient-to-b from-white to-green-100">
      <div className="mx-auto text-left">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <h2 className="lg:text-[48px] text-[35px] font-medium mb-4 text-black">
              Agile Digital Marketing and Design Solutions – Built to Scale
            </h2>
          </div>
          <div className="flex-1">
            <p className="text-gray-500 mt-3 mb-8">
              At Scalex Global, we move with agility to help ambitious brands
              connect with their audiences, co-create powerful digital
              experiences, and scale sustainably. Through website development,
              performance marketing, and content creation, we craft tailored
              strategies that drive measurable growth.
            </p>
            <Link href="/blogs">
              <button className="bg-primary-green text-black px-6 py-2 rounded-full hover:bg-green-300 transition border-1 border-black">
                See more
              </button>
            </Link>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {loading ? (
            <div className="flex justify-center items-center h-screen/5">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-green border-solid"></div>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`${
                  index % 2 === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                } rounded-2xl p-6 relative overflow-hidden`}
              >
                {/* Top section for the dot and text */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="bg-primary-green w-3 h-3 rounded-full mr-2"></div>
                    <p className="text-gray-400 text-sm">
                      {blog.readTime} min read
                    </p>
                  </div>
                </div>

                {/* Main title */}
                <h3 className="text-[26px] font-medium mb-4">{blog.title}</h3>

                {/* Content and button */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-4">
                  <div
                    className={`w-full md:w-[70%] ${
                      index % 2 === 0 ? "text-gray-300" : "text-black"
                    } overflow-hidden text-ellipsis`}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 6, // Limit to 3 lines
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    <p dangerouslySetInnerHTML={{ __html: blog.content }} />
                  </div>

                  <button
                    className="bg-primary-green text-black px-4 py-3 border-black border-1 rounded-full hover:bg-gray-200 transition w-[20%] mt-4 md:mt-0"
                    onClick={() =>
                      (window.location.href = `/blog?id=${blog.id}`)
                    }
                  >
                    →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
