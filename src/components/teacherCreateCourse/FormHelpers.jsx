"use client";
import { useState, useRef } from "react";
import { ImagePlus, X, Tag } from "lucide-react";

export const SimpleInput = ({ label, as = "input", ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    {as === "textarea" ? (
      <textarea className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-[#FF4667] focus:outline-none disabled:opacity-50" {...props} />
    ) : (
      <input className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-[#FF4667] focus:outline-none disabled:opacity-50" {...props} />
    )}
  </div>
);

export const ArrayInput = ({ label, placeholder, values, name, setFieldValue }) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        setFieldValue(name, [...values, inputValue.trim()]);
        setInputValue("");
      }
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
         <Tag size={16} className="text-[#FF4667]" /> {label}
      </label>
      <input
        type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder}
        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-[#FF4667] focus:outline-none"
      />
      <div className="flex flex-wrap gap-2 mt-1">
        {values.map((item, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md flex items-center gap-1 border">
            {item} <button type="button" onClick={() => setFieldValue(name, values.filter((_, i) => i !== index))} className="hover:text-red-500"><X size={12} /></button>
          </span>
        ))}
      </div>
    </div>
  );
};

export function CourseThumbnail({ previewUrl, setFieldValue }) {
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("thumbnailFile", file);
      setFieldValue("previewUrl", URL.createObjectURL(file));
    }
  };
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Course Thumbnail</label>
      <div onClick={() => fileInputRef.current?.click()} className="relative group h-64 w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-blue-50 transition overflow-hidden">
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
               <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-bold">Change Image</span>
             </div>
          </>
        ) : (
          <div className="text-center p-4 text-gray-500"><ImagePlus size={24} className="mx-auto mb-2 text-[#FF4667]"/> Upload Image</div>
        )}
      </div>
    </div>
  );
}