"use client";
import { useState, useRef } from "react";
import { ImagePlus, Video, Loader2, Trash2, CheckCircle } from "lucide-react";
import { useUploadOneMutation } from "@/redux/api/endPoints/cloudinaryApiSlice";
import { toast } from "react-hot-toast";

export default function MediaUploader({ 
  label, 
  accept, 
  type = "image", 
  folderPath = "courses/thumbnails", 
  currentFileUrl, 
  onUploadComplete,
  onRemove 
}) {
  const fileInputRef = useRef(null);
  const [uploadOne, { isLoading }] = useUploadOneMutation();

const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", folderPath); 
    formData.append("type", type);

    try {
      const res = await uploadOne(formData).unwrap();

      // 🔍🔍🔍 التصحيح هنا 🔍🔍🔍
      // الكنترولر بتاعك بيرجع الداتا جوه خاصية اسمها file
      // لو بعت res بس، الـ Formik هيتوه
      const actualData = res.file; 

      console.log("Uploaded Data to Save:", actualData); // للتأكد في الكونسول

      if (actualData && actualData.url) {
        onUploadComplete(actualData); 
        toast.success(`${type === 'image' ? 'Image' : 'Video'} uploaded!`);
      } else {
        toast.error("Upload response is missing file data");
      }

    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Upload failed");
    }
  };
  
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      
      {currentFileUrl ? (
        <div className="relative group w-full rounded-xl overflow-hidden border border-gray-200">
           {type === 'image' ? (
             <img src={currentFileUrl} alt="Uploaded" className="w-full h-48 object-cover" />
           ) : (
             <video src={currentFileUrl} controls className="w-full h-48 bg-black" />
           )}
           
           <div className="absolute top-2 right-2 flex gap-2">
              <span className="bg-green-500 text-white p-1 rounded-full text-xs shadow"><CheckCircle size={16}/></span>
              <button 
                type="button" 
                onClick={onRemove} 
                className="bg-white text-red-500 p-1.5 rounded-full shadow hover:bg-red-50"
              >
                <Trash2 size={16}/>
              </button>
           </div>
        </div>
      ) : (
        <div 
          onClick={() => !isLoading && fileInputRef.current?.click()} 
          className={`relative h-48 w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-blue-50 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             accept={accept} 
             onChange={handleFileChange} 
             disabled={isLoading}
          />
          
          {isLoading ? (
            <div className="flex flex-col items-center text-blue-500">
              <Loader2 size={32} className="animate-spin mb-2"/>
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
               {type === 'image' ? <ImagePlus size={32} className="mb-2 text-[#FF4667]"/> : <Video size={32} className="mb-2 text-[#FF4667]"/>}
               <span className="text-sm font-medium">Click to upload {type}</span>
               <span className="text-xs text-gray-400 mt-1">Max 10MB</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}