import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ClassCreator() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    fees: "",
    type: "offline",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreview = () => {
    setPreview({ ...form });
  };

  const handleCreate = () => {
    const timestamp = Date.now();
    const fileName = `class_${timestamp}.js`;

    const fileContent = `// src/classes/class_${timestamp}.js

const class_${timestamp} = 
  {
    id: ${timestamp},
    title: "${form.title}",
    date: "${form.date}",
    details: \`${form.description}\`,
    time: "${form.time}",
    price: "${form.fees}",
    type: "${form.type}",
  }

export default class_${timestamp};
`;

    const blob = new Blob([fileContent], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto grid gap-6">
      <div className="rounded-2xl shadow p-4 border">
        <h2 className="text-2xl font-semibold mb-4">Create New Class</h2>

        <input
          className="border p-2 rounded w-full"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded w-full"
          name="date"
          placeholder="Date"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded w-full"
          name="time"
          placeholder="Time"
          onChange={handleChange}
        />

        <textarea
          className="border p-2 rounded w-full"
          name="description"
          placeholder="Description"
          rows={5}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded w-full"
          name="fees"
          placeholder="Fees"
          onChange={handleChange}
        />

        <div className="flex gap-4 mt-2">
          <label className="flex gap-2">
            <input
              type="radio"
              name="type"
              value="online"
              checked={form.type === "online"}
              onChange={handleChange}
            />
            Online
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              name="type"
              value="offline"
              checked={form.type === "offline"}
              onChange={handleChange}
            />
            Offline
          </label>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handlePreview}
          >
            Preview
          </button>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Create Class File
          </button>
        </div>
      </div>

      {preview && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-2xl shadow p-4 bg-gray-50 border">
            <h3 className="text-xl font-bold mb-2">Preview</h3>
            <p><strong>Title:</strong> {preview.title}</p>
            <p><strong>Date:</strong> {preview.date}</p>
            <p><strong>Time:</strong> {preview.time}</p>
            <p><strong>Description:</strong> {preview.description}</p>
            <p><strong>Fees:</strong> {preview.fees}</p>
            <p><strong>Type:</strong> {preview.type}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
