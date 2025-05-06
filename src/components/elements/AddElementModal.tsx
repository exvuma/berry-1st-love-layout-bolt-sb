import React, { useState } from "react";
import axios from "axios";

const suggestedElements = [
    {
        title: "First Year Photo Display",
        description:
            "A beautiful 12-month photo arrangement showcasing your baby's growth and milestones. Perfect for guests to celebrate your child's journey.",
        image: "/images/first-year-photo.jpg",
        category: "decoration",
    },
    {
        title: "Time Capsule Station",
        description:
            "A special area where guests can leave heartfelt messages and mementos for your child to discover in the future.",
        image: "/images/time-capsule.jpg",
        category: "activity",
    },
];

const AddElementModal = ({ onClose, onAdd }: { onClose: () => void; onAdd: (el: any) => void }) => {
    const [tab, setTab] = useState("suggested");
    const [upload, setUpload] = useState<string | null>(null);
    const [link, setLink] = useState("");
    const [linkImages, setLinkImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("decoration");
    const [loading, setLoading] = useState(false);

    // Handle Upload
    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUpload(url);
            setSelectedImage(url);
        }
    }

    // Handle Link Import
    async function handleFetchImages() {
        setLoading(true);
        setLinkImages([]);
        setSelectedImage(null);
        try {
            const { data } = await axios.get(
                `http://localhost:4000/api/unfurl?url=${encodeURIComponent(link)}`
            );
            setLinkImages(data.images);
        } catch {
            alert("Could not fetch images from link.");
        }
        setLoading(false);
    }

    // Handle Add
    function handleAdd() {
        onAdd({
            id: Math.random().toString(),
            title,
            description: desc,
            image: selectedImage,
            category,
            relatedTasks: [],
            relatedTimelineEvents: [],
        });
        onClose();
    }

    // Handle Suggested
    function handleSuggested(el: any) {
        onAdd({
            ...el,
            id: Math.random().toString(),
            relatedTasks: [],
            relatedTimelineEvents: [],
        });
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
                <button
                    className="absolute top-4 right-4 text-neutral-400 hover:text-berry-red text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-2xl font-semibold mb-6">Add New Element</h2>
                <div className="flex gap-2 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg font-medium ${tab === "upload" ? "bg-berry-light text-berry-red" : "bg-neutral-100 text-neutral-600"}`}
                        onClick={() => setTab("upload")}
                    >
                        Upload
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-medium ${tab === "link" ? "bg-berry-light text-berry-red" : "bg-neutral-100 text-neutral-600"}`}
                        onClick={() => setTab("link")}
                    >
                        Import from Link
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-medium ${tab === "suggested" ? "bg-berry-light text-berry-red" : "bg-neutral-100 text-neutral-600"}`}
                        onClick={() => setTab("suggested")}
                    >
                        Suggested
                    </button>
                </div>
                {tab === "upload" && (
                    <div>
                        <input type="file" accept="image/*" onChange={handleUpload} />
                        {upload && (
                            <div className="mt-4">
                                <img src={upload} alt="Preview" className="w-40 h-40 object-cover rounded mb-2" />
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Title"
                                    className="block mb-2 w-full border rounded px-3 py-2"
                                />
                                <textarea
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}
                                    placeholder="Description"
                                    className="block mb-2 w-full border rounded px-3 py-2"
                                />
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="block mb-2 w-full border rounded px-3 py-2"
                                >
                                    <option value="decoration">Decoration</option>
                                    <option value="food">Food & Treats</option>
                                    <option value="activity">Activity</option>
                                    <option value="other">Other</option>
                                </select>
                                <button
                                    onClick={handleAdd}
                                    disabled={!title || !upload}
                                    className="bg-berry-red text-white px-4 py-2 rounded-lg mt-2 disabled:opacity-50"
                                >
                                    Add Element
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {tab === "link" && (
                    <div>
                        <input
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            placeholder="Paste a link"
                            className="block mb-2 w-full border rounded px-3 py-2"
                        />
                        <button
                            onClick={handleFetchImages}
                            disabled={!link || loading}
                            className="bg-berry-red text-white px-4 py-2 rounded-lg mb-2"
                        >
                            {loading ? "Loading..." : "Fetch Images"}
                        </button>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {linkImages.map(img => (
                                <img
                                    key={img}
                                    src={img}
                                    alt=""
                                    className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                        {selectedImage && (
                            <div className="mt-4">
                                <img src={selectedImage} alt="Selected" className="w-40 h-40 object-cover rounded mb-2" />
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Title"
                                    className="block mb-2 w-full border rounded px-3 py-2"
                                />
                                <textarea
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}
                                    placeholder="Description"
                                    className="block mb-2 w-full border rounded px-3 py-2"
                                />
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="block mb-2 w-full border rounded px-3 py-2"
                                >
                                    <option value="decoration">Decoration</option>
                                    <option value="food">Food & Treats</option>
                                    <option value="activity">Activity</option>
                                    <option value="other">Other</option>
                                </select>
                                <button
                                    onClick={handleAdd}
                                    disabled={!title || !selectedImage}
                                    className="bg-berry-red text-white px-4 py-2 rounded-lg mt-2 disabled:opacity-50"
                                >
                                    Add Element
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {tab === "suggested" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {suggestedElements.map((el, i) => (
                            <div
                                key={i}
                                className="suggested-card cursor-pointer border rounded p-3 hover:bg-berry-light/30"
                                onClick={() => handleSuggested(el)}
                            >
                                <img src={el.image} alt={el.title} className="w-full h-32 object-cover rounded mb-2" />
                                <h3 className="font-semibold">{el.title}</h3>
                                <p className="text-sm">{el.description}</p>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={onClose} className="mt-6 px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddElementModal; 