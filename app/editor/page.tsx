'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
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

const BlogEditor = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
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
    if (!title || !content || !category || !shortTitle || !coverImage) {
      alert("All fields are required!");
      return;
    }

    const email = user?.email || "unknown@example.com";
    const publisher = publisherData[email] || {
      name: "Unknown",
      designation: "Guest",
    };

    // Calculate read time based on content length (words per minute)
    const wordCount = content.split(/\s+/).length; // Count words by splitting on spaces
    const readTime = Math.round(wordCount / 200); // Round to the nearest minute

    try {
      const blogId = generateRandomId();

      // Upload cover image to Firebase Storage
      const coverImageRef = ref(storage, `cover_images/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      const coverImageUrl = await getDownloadURL(coverImageRef);

      // Create or update the blog document with the generated blogId
      await setDoc(doc(db, "blogs", blogId.toString()), {
        id: blogId,
        title,
        category,
        shortTitle,
        content,
        coverImageUrl,
        createdAt: Timestamp.now(),
        publisher: publisher.name,
        designation: publisher.designation,
        email: email,
        readTime: readTime, // Add readTime to the document
      });

      alert("Blog saved successfully!");
      setTitle("");
      setCategory("");
      setShortTitle("");
      setContent("");
      setCoverImage(null);
    } catch (err: any) {
      alert("Error saving blog: " + err.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
        <Metadata
            title="Blog Editor - ScaleX"
            description="Create and edit blog posts for the ScaleX website."
        />
      <button
        onClick={() => logout()}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>

      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 border rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Short Title"
        className="w-full p-2 border rounded mb-4"
        value={shortTitle}
        onChange={(e) => setShortTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        className="w-full p-2 border rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleCoverImageChange}
        className="mb-4"
      />

      <ReactQuill value={content} onChange={setContent} className="mb-4" />

      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Blog
      </button>
    </div>
  );
};

export default BlogEditor;
