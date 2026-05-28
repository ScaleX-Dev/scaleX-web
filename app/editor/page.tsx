'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const publisherData: { [key: string]: { name: string; designation: string } } = {
  "123@gmail.com": { name: "Root User", designation: "Root" },
  "yasiru@scalex.global": {
    name: "Yasiru Lakintha",
    designation: "UI/UX Developer",
  },
  "chirath@scalex.global": { name: "Chirath Hewagamage", designation: "CEO" },
};

type PublishTarget = "blog" | "resource";
type ResourceType = "case_study" | "video" | "article" | "guide";

const BlogEditor = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [publishTarget, setPublishTarget] = useState<PublishTarget>("blog");
  const [resourceType, setResourceType] = useState<ResourceType>("article");
  const [clientName, setClientName] = useState("");
  const [clientMeta, setClientMeta] = useState("");
  const [readTime, setReadTime] = useState("");
  const { logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
        router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "editor",
      title: "Blog Editor - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "editor"
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
          trackEvent("scroll_depth", { depth: milestone, page: "editor" });
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


  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setCoverImage(e.target.files[0]);
    }
  };

  const generateRandomId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handleSave = async () => {
    if (!title || !content || !shortTitle || !coverImage) {
      alert("Title, short title, content, and cover image are required!");
      return;
    }
    if (publishTarget === "blog" && !category) {
      alert("Category is required for blog posts!");
      return;
    }

    const email = user?.email || "unknown@example.com";
    const publisher = publisherData[email] || {
      name: "Unknown",
      designation: "Guest",
    };

    const wordCount = content.split(/\s+/).length;
    const autoReadTime = Math.round(wordCount / 200);

    try {
      const id = generateRandomId();

      const coverImageRef = ref(storage, `cover_images/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      const coverImageUrl = await getDownloadURL(coverImageRef);

      if (publishTarget === "blog") {
        await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            title,
            category,
            shortTitle,
            content,
            coverImageUrl,
            createdAt: new Date().toISOString(),
            publisher: publisher.name,
            designation: publisher.designation,
            email,
            readTime: autoReadTime,
          }),
        });
        alert("Blog saved successfully!");
      } else {
        await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            title,
            shortTitle,
            type: resourceType,
            content,
            coverImageUrl,
            createdAt: new Date().toISOString(),
            publisher: publisher.name,
            designation: publisher.designation,
            email,
            featured: resourceType === "case_study",
            readTime: readTime || `${autoReadTime} min read`,
            clientName: clientName || null,
            clientMeta: clientMeta || null,
          }),
        });
        alert("Resource saved successfully!");
      }

      setTitle("");
      setCategory("");
      setShortTitle("");
      setContent("");
      setCoverImage(null);
      setClientName("");
      setClientMeta("");
      setReadTime("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert("Error saving: " + message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
        <Metadata
            title="Content Editor - ScaleX"
            description="Create and edit blog posts and resources for the ScaleX website."
        />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Content Editor</h1>
        <button
          onClick={() => logout()}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>

      {/* Publish target toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-700">Publish as:</span>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          {(["blog", "resource"] as PublishTarget[]).map((t) => (
            <button
              key={t}
              onClick={() => setPublishTarget(t)}
              className={`px-4 py-2 text-sm capitalize transition-colors ${
                publishTarget === t
                  ? "bg-[#0c0d0e] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t === "blog" ? "Blog post" : "Resource"}
            </button>
          ))}
        </div>
      </div>

      {/* Resource type selector (only shown for resources) */}
      {publishTarget === "resource" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Resource type</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value as ResourceType)}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="case_study">Case study</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="guide">Guide</option>
          </select>
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Short title (for cards)"
        className="w-full p-2 border rounded mb-4"
        value={shortTitle}
        onChange={(e) => setShortTitle(e.target.value)}
      />

      {publishTarget === "blog" ? (
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Client name (case studies only, optional)"
            className="w-full p-2 border rounded mb-4"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client meta (e.g. 'Architecture practice · 30 years', optional)"
            className="w-full p-2 border rounded mb-4"
            value={clientMeta}
            onChange={(e) => setClientMeta(e.target.value)}
          />
          <input
            type="text"
            placeholder="Read time (e.g. '7 min read', optional — auto-calculated if blank)"
            className="w-full p-2 border rounded mb-4"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleCoverImageChange}
        className="mb-4"
      />

      <ReactQuill value={content} onChange={setContent} className="mb-4" />

      <button
        onClick={handleSave}
        className="bg-[#0c0d0e] text-white px-6 py-2.5 rounded font-medium hover:bg-[#00ff81] hover:text-black transition-colors"
      >
        Publish {publishTarget === "blog" ? "Blog post" : "Resource"}
      </button>
    </div>
  );
};

export default BlogEditor;
