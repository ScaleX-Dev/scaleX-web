import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const publisherData = {
  "123@gmail.com": { name: "Root User", designation: "Root" },
  "yasiru@scalex.global": {
    name: "Yasiru Lakintha",
    designation: "UI/UX Developer",
  },
  "chirath@scalex.global": { name: "Chirath Hewagamage", designation: "CEO" },
};

const BlogEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const quillRef = useRef(null);

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
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
    } catch (err) {
      alert("Error saving blog: " + err.message);
    }
  };

  return (
    <div className="p-6">
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
