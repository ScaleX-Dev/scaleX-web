import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage } from "../firebaseConfig"; // Assuming you're using Firebase Storage for the cover image
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

const BlogEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Create a ref for ReactQuill
  const quillRef = useRef(null);

  // Handle cover image upload
  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  // Save blog to Firebase
  const handleSave = async () => {
    if (!title || !content || !category || !shortTitle || !coverImage) {
      alert("All fields are required!");
      return;
    }
    
    try {
      // Upload cover image to Firebase Storage
      const coverImageRef = ref(storage, `cover_images/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      const coverImageUrl = await getDownloadURL(coverImageRef);

      // Add blog document to Firestore with the cover image URL
      await addDoc(collection(db, "blogs"), {
        title,
        category,
        shortTitle,
        content,
        coverImageUrl,
        createdAt: Timestamp.now(),
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
      <button onClick={() => logout()} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
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

      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
        Save Blog
      </button>
    </div>
  );
};

export default BlogEditor;