'use client'
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

interface BlogPost {
    id: string;
    dark: boolean;
    imageStyle: {
        top: string;
        width: string;
        left: string;
    };
    coverImageUrl: string;
    title: string;
    category: string;
}

const BlogPage = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "blogs",
      title: "Blogs - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "blogs"
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
          trackEvent("scroll_depth", { depth: milestone, page: "blogs" });
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
        })) as BlogPost[];
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

  const openBlog = (post: BlogPost) => {
    router.push(`/blog?id=${post.id}`);
  };

  return (
    <div className="bg-[#0c0d0e] min-h-screen flex flex-col relative overflow-hidden">
      <Metadata
        title="Field Notes — ScaleX"
        description="Read the latest insights, tips, and news from the ScaleX digital marketing team."
      />

      {/* Ambient glow */}
      <div className="absolute top-[5%] right-[10%] w-[600px] h-[450px] bg-[#00ff81]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1.2px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 45% at 60% 15%, black 10%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 45% at 60% 15%, black 10%, transparent 100%)",
        }}
      />

      <Navbar />

      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-44 pb-16 relative z-10 w-full">
        <p className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.25em] uppercase mb-6">
          Field Notes
        </p>
        <h1 className="font-medium tracking-[-0.025em] leading-[1.0] text-[2.6rem] sm:text-5xl md:text-[3.5rem] text-white mb-6">
          Ideas worth{" "}
          <span className="text-white/25">reading.</span>
        </h1>
        <p className="text-white/40 text-sm md:text-base max-w-sm leading-relaxed">
          Marketing, branding, and design perspectives from the ScaleX team.
        </p>
      </section>

      {/* Blog Grid */}
      <main className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pb-32 relative z-10 w-full flex-grow">
        {error && <div className="text-center py-20 text-red-400 font-mono text-sm">{error}</div>}

        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#00ff81] rounded-full animate-spin" />
          </div>
        )}

        {!loading && !error && blogPosts.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post) => (
              <li key={post.id} className="group relative h-[380px] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent z-10" />
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src={post.coverImageUrl}
                  alt={post.title || "Blog post cover"}
                  loading="lazy"
                />
                <div className="absolute top-5 left-5 z-20">
                  <span className="text-[10px] font-mono text-[#00ff81] tracking-[0.2em] uppercase block mb-2">
                    {post.category || "Uncategorized"}
                  </span>
                  <h2 className="text-white font-medium text-xl leading-snug line-clamp-2 max-w-[260px]">
                    {post.title || "Untitled"}
                  </h2>
                </div>
                <button
                  className="absolute inset-0 z-30"
                  onClick={() => openBlog(post)}
                  aria-label={`Open ${post.title || "blog post"}`}
                />
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && blogPosts.length === 0 && (
          <p className="text-white/25 font-mono text-sm py-20 text-center">No posts yet — check back soon.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
