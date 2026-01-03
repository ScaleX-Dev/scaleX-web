'use client'
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

interface BlogPost {
    title: string;
    content: string;
    coverImageUrl: string;
    publisher: string;
    designation: string;
    authorImage: string;
    createdAt: Timestamp;
}

const BlogClient = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const searchParams = useSearchParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const blogId = searchParams?.get("id") ?? null;

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "blog",
      title: blogPost?.title || "Blog - ScaleX",
      blogId
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "blog",
          blogId
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
          trackEvent("scroll_depth", { depth: milestone, page: "blog", blogId });
        }
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [blogId, blogPost?.title]);

  useEffect(() => {
    if (blogId) {
      const fetchBlogPost = async () => {
        try {
          const blogRef = doc(db, "blogs", blogId);
          const blogSnap = await getDoc(blogRef);

          if (blogSnap.exists()) {
            setBlogPost(blogSnap.data() as BlogPost);
          } else {
            console.log("No such blog!");
          }
        } catch (error) {
          console.error("Error fetching blog: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlogPost();
    } else {
        setLoading(false);
    }
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Navbar />
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-green border-solid"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="text-center mt-10 text-gray-600">Blog not found.</div>
    );
  }

  return (
    <div className="mx-auto">
        <Metadata
            title={blogPost.title}
            description="Detailed blog post from ScaleX. Stay updated with our latest articles."
        />
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
      <div className="block w-full text-gray-900 bg-white rounded-t-none block-canvas">
        <div className="min-h-screen flex flex-col">
          {/* Cover Image */}
          <div className="w-full h-[200px] md:h-[300px] lg:h-[300px] overflow-hidden">
            <img
              src={blogPost.coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Container */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Author Section */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  blogPost.authorImage ||
                  "https://lirp.cdn-website.com/eda4ad32/dms3rep/multi/opt/41717CF9-288E-4F9C-BF86-9E35DA494F87-640w.jpg"
                }
                alt={blogPost.publisher}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {blogPost.publisher}
                </p>
                <p className="text-gray-500 text-xs">
                  {blogPost.designation} •{" "}
                  {blogPost.createdAt?.toDate
                    ? format(blogPost.createdAt.toDate(), "MMM dd, yyyy")
                    : "Unknown Date"}
                </p>
              </div>
            </div>

            {/* Blog Title */}
            <h1 className="text-3xl font-bold text-gray-900 mt-6 leading-tight">
              {blogPost.title}
            </h1>

            {/* Blog Content */}
            <div
              className="mt-4 text-gray-700 text-lg leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogClient;
