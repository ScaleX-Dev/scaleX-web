'use client'
import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const publisherData: { [key: string]: { name: string; designation: string } } = {
  "123@gmail.com": { name: "Root User", designation: "Root" },
  "yasiru@scalex.global": { name: "Yasiru Lakintha", designation: "UI/UX Developer" },
  "chirath@scalex.global": { name: "Chirath Hewagamage", designation: "CEO" },
  "admin@scalex.global": { name: "Chirath Hewagamage", designation: "CEO" },
};

type PublishTarget = "blog" | "resource";
type ResourceType = "case_study" | "video" | "article" | "guide";
type ToastType = "success" | "error";
type View = "compose" | "library";

interface Toast { id: number; message: string; type: ToastType }

interface LibraryItem {
  id: string;
  title: string;
  shortTitle?: string;
  target: PublishTarget;
  type?: string;
  category?: string;
  coverImageUrl?: string;
  createdAt?: string;
  content?: string;
  clientName?: string;
  clientMeta?: string;
  readTime?: string;
}

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#00ff81]/40 focus:bg-white/[0.06] transition-all duration-200";

const labelClass = "block text-[11px] font-mono text-white/35 tracking-[0.18em] uppercase mb-1.5";

const TYPE_LABELS: Record<string, string> = {
  case_study: "Case study",
  video: "Video",
  article: "Article",
  guide: "Guide",
};

const BlogEditor = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // View state
  const [view, setView] = useState<View>("compose");

  // Compose form state
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [publishTarget, setPublishTarget] = useState<PublishTarget>("blog");
  const [resourceType, setResourceType] = useState<ResourceType>("article");
  const [clientName, setClientName] = useState("");
  const [clientMeta, setClientMeta] = useState("");
  const [readTime, setReadTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);

  // Library state
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [libraryFilter, setLibraryFilter] = useState<"all" | PublishTarget>("all");

  const { logout, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", { page: "editor", title: "Blog Editor - ScaleX" });
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) trackEvent("click", { element: button.tagName.toLowerCase(), text: button.textContent?.trim() || '', href: button.getAttribute('href'), page: "editor" });
    };
    const handleScroll = () => {
      const scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollTrackedRef.current.has(milestone)) {
          scrollTrackedRef.current.add(milestone);
          trackEvent("scroll_depth", { depth: milestone, page: "editor" });
        }
      });
    };
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return () => { document.removeEventListener('click', handleClick); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const fetchItems = useCallback(async () => {
    setLoadingItems(true);
    try {
      const [blogsRes, resourcesRes] = await Promise.all([
        fetch("/api/blogs").then(r => r.json()),
        fetch("/api/resources").then(r => r.json()),
      ]);
      const blogs = (blogsRes as LibraryItem[]).map(b => ({ ...b, target: "blog" as PublishTarget }));
      const resources = (resourcesRes as LibraryItem[]).map(r => ({ ...r, target: "resource" as PublishTarget }));
      setItems([...blogs, ...resources].sort((a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      ));
    } catch {
      addToast("Failed to load content library.", "error");
    } finally {
      setLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    if (view === "library") fetchItems();
  }, [view, fetchItems]);

  const resetCompose = () => {
    setTitle(""); setCategory(""); setShortTitle(""); setContent("");
    setCoverImage(null); setCoverPreview(null); setClientName("");
    setClientMeta(""); setReadTime(""); setEditingId(null); setExistingCoverUrl(null);
  };

  const handleCoverFile = (file: File) => {
    setCoverImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setCoverPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleCoverFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleCoverFile(file);
  };

  const generateRandomId = () => Math.floor(1000 + Math.random() * 9000);

  const handleEdit = (item: LibraryItem) => {
    setEditingId(String(item.id));
    setPublishTarget(item.target);
    setTitle(item.title || "");
    setShortTitle(item.shortTitle || "");
    setContent(item.content || "");
    setExistingCoverUrl(item.coverImageUrl || null);
    setCoverPreview(item.coverImageUrl || null);
    setCoverImage(null);
    if (item.target === "resource") {
      setResourceType((item.type as ResourceType) || "article");
      setClientName(item.clientName || "");
      setClientMeta(item.clientMeta || "");
      setReadTime(item.readTime || "");
    } else {
      setCategory(item.category || "");
    }
    setView("compose");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string, target: PublishTarget) => {
    if (!confirm(`Delete this ${target === "blog" ? "blog post" : "resource"}? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const endpoint = target === "blog" ? "/api/blogs" : "/api/resources";
      await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
      addToast("Deleted successfully.", "success");
      setItems(prev => prev.filter(i => String(i.id) !== String(id)));
    } catch {
      addToast("Delete failed.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async () => {
    if (!title || !content || !shortTitle || (!coverImage && !existingCoverUrl)) {
      addToast("Title, short title, content and cover image are required.", "error");
      return;
    }
    if (publishTarget === "blog" && !category) {
      addToast("Category is required for blog posts.", "error");
      return;
    }
    setSaving(true);
    const email = user?.email || "unknown@example.com";
    const publisher = publisherData[email] || { name: user?.name || "Unknown", designation: "Admin" };
    const wordCount = content.split(/\s+/).length;
    const autoReadTime = Math.round(wordCount / 200);
    try {
      let coverImageUrl = existingCoverUrl;
      if (coverImage) {
        const uploadForm = new FormData();
        uploadForm.append("file", coverImage);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
        if (!uploadRes.ok) throw new Error("Image upload failed");
        const { url } = await uploadRes.json();
        coverImageUrl = url;
      }
      const id = editingId || String(generateRandomId());
      if (publishTarget === "blog") {
        await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, title, category, shortTitle, content, coverImageUrl, createdAt: new Date().toISOString(), publisher: publisher.name, designation: publisher.designation, email, readTime: autoReadTime }),
        });
        addToast(editingId ? "Blog post updated." : "Blog post published.", "success");
      } else {
        await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, title, shortTitle, type: resourceType, content, coverImageUrl, createdAt: new Date().toISOString(), publisher: publisher.name, designation: publisher.designation, email, featured: resourceType === "case_study", readTime: readTime || `${autoReadTime} min read`, clientName: clientName || null, clientMeta: clientMeta || null }),
        });
        addToast(editingId ? "Resource updated." : "Resource published.", "success");
      }
      resetCompose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      addToast("Error publishing: " + message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) return (
    <div className="min-h-screen bg-[#0c0d0e] flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white/10 border-t-[#00ff81] rounded-full animate-spin" />
    </div>
  );

  const initials = (user.name || user.email).slice(0, 2).toUpperCase();
  const filteredItems = libraryFilter === "all" ? items : items.filter(i => i.target === libraryFilter);

  return (
    <div className="min-h-screen bg-[#0c0d0e]">
      <Metadata title="Content Editor - ScaleX" description="Create and edit blog posts and resources for the ScaleX website." />

      {/* Toast notifications */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm backdrop-blur-md border transition-all duration-300 shadow-xl pointer-events-auto ${
              t.type === "success"
                ? "bg-[#00ff81]/10 border-[#00ff81]/20 text-[#00ff81]"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {t.type === "success" ? (
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            )}
            {t.message}
          </div>
        ))}
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0c0d0e]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.28em] uppercase">ScaleX</span>
            <span className="text-white/10 text-xs">/</span>
            <span className="text-white/40 text-xs">Content Studio</span>
            {/* View tabs — desktop */}
            <div className="hidden sm:flex items-center gap-0.5 ml-4 bg-white/[0.04] border border-white/[0.06] rounded-lg p-0.5">
              {([["compose", "New post"], ["library", "Library"]] as [View, string][]).map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                    view === v ? "bg-white/[0.08] text-white" : "text-white/35 hover:text-white/60"
                  }`}
                >
                  {label}
                  {v === "library" && items.length > 0 && (
                    <span className="ml-1.5 text-white/25">{items.length}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* View tabs — mobile */}
            <div className="flex sm:hidden items-center gap-0.5 bg-white/[0.04] border border-white/[0.06] rounded-lg p-0.5">
              {([["compose", "Write"], ["library", "Library"]] as [View, string][]).map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`text-[11px] font-medium px-2.5 py-1.5 rounded-md transition-all duration-200 ${
                    view === v ? "bg-white/[0.08] text-white" : "text-white/35 hover:text-white/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#00ff81]/15 border border-[#00ff81]/20 flex items-center justify-center">
                <span className="text-[10px] font-mono text-[#00ff81]">{initials}</span>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-xs text-white/70">{user.name}</span>
                <span className="text-[10px] text-white/30 font-mono">{user.email}</span>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-white/[0.04]"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ─────────── COMPOSE VIEW ─────────── */}
      {view === "compose" && (
        <main className="max-w-4xl mx-auto px-6 py-10">

          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-medium text-white tracking-[-0.02em]">
                  {editingId ? "Edit post" : "New post"}
                </h1>
                <p className="text-sm text-white/30 mt-1">
                  {editingId ? "Update and republish this item" : "Create and publish content to the ScaleX platform"}
                </p>
              </div>
              {editingId && (
                <button
                  onClick={resetCompose}
                  className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors px-3 py-2 rounded-lg border border-white/[0.06] hover:border-white/[0.12]"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cancel edit
                </button>
              )}
            </div>
          </div>

          {/* Publish target toggle */}
          <div className="mb-8">
            <div className="inline-flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 gap-1">
              {(["blog", "resource"] as PublishTarget[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setPublishTarget(t)}
                  className={`px-5 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                    publishTarget === t
                      ? "bg-[#00ff81] text-[#0c0d0e]"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {t === "blog" ? "Blog post" : "Resource"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">

            {/* Core fields */}
            <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-5">Content details</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Title</label>
                  <input type="text" placeholder="Enter a compelling title…" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Short title <span className="text-white/20 normal-case font-sans tracking-normal">— used in cards</span></label>
                  <input type="text" placeholder="Shorter version for preview cards" className={inputClass} value={shortTitle} onChange={(e) => setShortTitle(e.target.value)} />
                </div>
                {publishTarget === "blog" ? (
                  <div>
                    <label className={labelClass}>Category</label>
                    <input type="text" placeholder="e.g. Growth, Branding, Design" className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)} />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className={labelClass}>Resource type</label>
                      <select value={resourceType} onChange={(e) => setResourceType(e.target.value as ResourceType)} className={inputClass + " cursor-pointer"}>
                        <option value="article" style={{ background: "#1a1b1c" }}>Article</option>
                        <option value="case_study" style={{ background: "#1a1b1c" }}>Case study</option>
                        <option value="guide" style={{ background: "#1a1b1c" }}>Guide</option>
                        <option value="video" style={{ background: "#1a1b1c" }}>Video</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Client name <span className="text-white/20 normal-case font-sans tracking-normal">— optional</span></label>
                        <input type="text" placeholder="e.g. Acme Corp" className={inputClass} value={clientName} onChange={(e) => setClientName(e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>Client meta <span className="text-white/20 normal-case font-sans tracking-normal">— optional</span></label>
                        <input type="text" placeholder="e.g. Architecture · 30 years" className={inputClass} value={clientMeta} onChange={(e) => setClientMeta(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Read time <span className="text-white/20 normal-case font-sans tracking-normal">— auto-calculated if blank</span></label>
                      <input type="text" placeholder="e.g. 7 min read" className={inputClass} value={readTime} onChange={(e) => setReadTime(e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cover image */}
            <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-5">Cover image</h2>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden ${
                  dragOver ? "border-[#00ff81]/50 bg-[#00ff81]/5" : coverPreview ? "border-white/10" : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
                }`}
              >
                {coverPreview ? (
                  <div className="relative">
                    <img src={coverPreview} alt="Cover preview" className="w-full h-52 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Change image</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3.75 3h16.5M4.5 3v18M19.5 3v18" /></svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-white/40">Drop an image here or <span className="text-[#00ff81]/70">browse</span></p>
                      <p className="text-xs text-white/20 mt-1">PNG, JPG, WEBP — recommended 1200×630</p>
                    </div>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
              {coverImage && (
                <p className="text-xs text-white/30 mt-2 font-mono truncate">{coverImage.name}</p>
              )}
              {!coverImage && existingCoverUrl && (
                <p className="text-xs text-white/20 mt-2">Using existing cover — upload a new image to replace it.</p>
              )}
            </div>

            {/* Content editor */}
            <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-5">Body content</h2>
              <style>{`
                .ql-toolbar { background: rgba(255,255,255,0.03) !important; border: 1px solid rgba(255,255,255,0.08) !important; border-bottom: none !important; border-radius: 12px 12px 0 0 !important; }
                .ql-container { border: 1px solid rgba(255,255,255,0.08) !important; border-radius: 0 0 12px 12px !important; background: rgba(255,255,255,0.02) !important; min-height: 280px; }
                .ql-editor { color: rgba(255,255,255,0.75) !important; font-size: 14px !important; line-height: 1.7 !important; min-height: 280px; }
                .ql-editor.ql-blank::before { color: rgba(255,255,255,0.15) !important; font-style: normal !important; }
                .ql-toolbar .ql-stroke { stroke: rgba(255,255,255,0.35) !important; }
                .ql-toolbar .ql-fill { fill: rgba(255,255,255,0.35) !important; }
                .ql-toolbar button:hover .ql-stroke, .ql-toolbar button.ql-active .ql-stroke { stroke: #00ff81 !important; }
                .ql-toolbar button:hover .ql-fill, .ql-toolbar button.ql-active .ql-fill { fill: #00ff81 !important; }
                .ql-toolbar .ql-picker-label { color: rgba(255,255,255,0.35) !important; }
                .ql-toolbar .ql-picker-options { background: #1a1b1c !important; border: 1px solid rgba(255,255,255,0.08) !important; border-radius: 8px !important; }
                .ql-toolbar .ql-picker-item { color: rgba(255,255,255,0.6) !important; }
              `}</style>
              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Start writing your content…"
              />
            </div>

            {/* Publish */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-white/20">
                Publishing as <span className="text-white/40">{user.name || user.email}</span>
              </p>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#00ff81] text-[#0c0d0e] font-medium text-sm px-6 py-3 rounded-xl hover:bg-[#00e872] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0c0d0e]/20 border-t-[#0c0d0e] rounded-full animate-spin" />
                    {editingId ? "Updating…" : "Publishing…"}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
                    {editingId ? "Update post" : `Publish ${publishTarget === "blog" ? "blog post" : "resource"}`}
                  </>
                )}
              </button>
            </div>

          </div>
        </main>
      )}

      {/* ─────────── LIBRARY VIEW ─────────── */}
      {view === "library" && (
        <main className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-medium text-white tracking-[-0.02em]">Content library</h1>
              <p className="text-sm text-white/30 mt-1">All published blogs and resources</p>
            </div>
            <button
              onClick={() => { resetCompose(); setView("compose"); }}
              className="flex items-center gap-2 bg-[#00ff81] text-[#0c0d0e] text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#00e872] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              New post
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 mb-6">
            {(["all", "blog", "resource"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setLibraryFilter(f)}
                className={`text-[12px] font-medium px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  libraryFilter === f
                    ? "bg-white/[0.08] border-white/[0.12] text-white"
                    : "border-transparent text-white/30 hover:text-white/55"
                }`}
              >
                {f === "all" ? "All" : f === "blog" ? "Blogs" : "Resources"}
                <span className="ml-1.5 text-white/25">
                  {f === "all" ? items.length : items.filter(i => i.target === f).length}
                </span>
              </button>
            ))}
            <button
              onClick={fetchItems}
              className="ml-auto text-white/25 hover:text-white/55 transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
            </button>
          </div>

          {loadingItems ? (
            <div className="flex justify-center py-24">
              <div className="w-7 h-7 border-2 border-white/10 border-t-[#00ff81] rounded-full animate-spin" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-24 text-white/20 font-mono text-sm">No content found.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredItems.map((item) => (
                <div
                  key={`${item.target}-${item.id}`}
                  className="flex items-center gap-4 bg-white/[0.025] border border-white/[0.07] rounded-2xl p-4 hover:border-white/[0.12] transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/[0.05] border border-white/[0.06]">
                    {item.coverImageUrl ? (
                      <img src={item.coverImageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" /></svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border ${
                        item.target === "blog"
                          ? "bg-violet-900/30 text-violet-400 border-violet-700/30"
                          : item.type === "case_study"
                          ? "bg-[#00ff81]/10 text-[#00ff81] border-[#00ff81]/20"
                          : item.type === "video"
                          ? "bg-blue-900/30 text-blue-400 border-blue-700/30"
                          : item.type === "guide"
                          ? "bg-amber-900/20 text-amber-400 border-amber-700/20"
                          : "bg-white/[0.07] text-white/40 border-white/[0.10]"
                      }`}>
                        {item.target === "blog" ? (item.category || "Blog") : (TYPE_LABELS[item.type || ""] || item.type)}
                      </span>
                      {item.createdAt && (
                        <span className="text-[10px] text-white/20 font-mono">
                          {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-white/80 truncate">{item.title}</p>
                    {(item.clientMeta || item.readTime) && (
                      <p className="text-[11px] text-white/25 mt-0.5 truncate">{item.clientMeta || item.readTime}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1.5 text-xs text-white/35 hover:text-[#00ff81] transition-colors px-3 py-2 rounded-lg border border-white/[0.06] hover:border-[#00ff81]/20 hover:bg-[#00ff81]/[0.05]"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.target)}
                      disabled={deletingId === String(item.id)}
                      className="flex items-center gap-1.5 text-xs text-white/25 hover:text-red-400 transition-colors px-3 py-2 rounded-lg border border-white/[0.06] hover:border-red-500/20 hover:bg-red-500/[0.05] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {deletingId === String(item.id) ? (
                        <div className="w-3.5 h-3.5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default BlogEditor;
