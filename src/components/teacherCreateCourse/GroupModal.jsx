

"use client";
import { useEffect } from "react";
import { X, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleInput } from "./FormHelpers";

const DAY_MAP_TO_BACKEND = { "Saturday": "sat", "Sunday": "sun", "Monday": "mon", "Tuesday": "tue", "Wednesday": "wed", "Thursday": "thu", "Friday": "fri" };

export default function GroupModal({ 
  isOpen, 
  onClose, 
  tempGroup, 
  setTempGroup, 
  onSave, 
  isEditing 
}) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScheduleChange = (idx, field, val) => {
    const newSched = [...tempGroup.schedule];
    newSched[idx][field] = val;
    setTempGroup({ ...tempGroup, schedule: newSched });
  };
  const addScheduleSlot = () => setTempGroup({ ...tempGroup, schedule: [...tempGroup.schedule, { day: "Monday", time: "14:00" }] });
  const removeScheduleSlot = (idx) => { if(tempGroup.schedule.length > 1) setTempGroup({...tempGroup, schedule: tempGroup.schedule.filter((_, i) => i !== idx)}); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
           <h3 className="text-lg font-bold text-gray-800">
             {isEditing ? "Edit Group Details" : "Create New Batch"}
           </h3>
           <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20}/></button>
        </div>

        <div className="p-6 space-y-5">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SimpleInput label="Group Title (> 5 chars)" value={tempGroup.title} onChange={(e)=>setTempGroup({...tempGroup, title: e.target.value})} placeholder="e.g. Group A - Excellence" />
             <div className="flex flex-col gap-1.5">
               <label className="text-sm font-semibold text-gray-700">Type</label>
               <select className="h-10 border rounded-md px-2 bg-white" value={tempGroup.type} onChange={(e)=>setTempGroup({...tempGroup, type: e.target.value})}>
                 <option value="online">Online</option>
                 <option value="offline">Offline</option>
                 <option value="hybrid">Hybrid</option>
               </select>
             </div>
           </div>

           <SimpleInput label="Description (Optional)" as="textarea" rows={2} value={tempGroup.description} onChange={(e)=>setTempGroup({...tempGroup, description: e.target.value})} />

           <div className="grid grid-cols-3 gap-4">
             <SimpleInput label="Price (EGP)" type="number" value={tempGroup.price} onChange={(e)=>setTempGroup({...tempGroup, price: e.target.value})} />
             <SimpleInput label="Capacity" type="number" value={tempGroup.capacity} onChange={(e)=>setTempGroup({...tempGroup, capacity: e.target.value})} />
             <SimpleInput label="Start Date" type="date" value={tempGroup.startingDate} onChange={(e)=>setTempGroup({...tempGroup, startingDate: e.target.value})} />
           </div>

           {(tempGroup.type === "online" || tempGroup.type === "hybrid") && (
              <SimpleInput label="Meeting Link" value={tempGroup.link} onChange={(e)=>setTempGroup({...tempGroup, link: e.target.value})} placeholder="https://..." />
           )}
           {(tempGroup.type === "offline" || tempGroup.type === "hybrid") && (
              <SimpleInput label="Center Location" value={tempGroup.location} onChange={(e)=>setTempGroup({...tempGroup, location: e.target.value})} placeholder="Address..." />
           )}

           <div className="bg-gray-50 p-4 rounded-xl border">
              <label className="text-xs font-bold text-gray-500 mb-2 block flex items-center gap-1"><Clock size={12}/> WEEKLY SCHEDULE</label>
              {tempGroup.schedule.map((slot, idx) => (
                <div key={idx} className="flex gap-2 items-center mb-2">
                   <select className="w-1/3 text-sm border rounded p-2" value={slot.day} onChange={(e) => handleScheduleChange(idx, "day", e.target.value)}>
                      {Object.keys(DAY_MAP_TO_BACKEND).map(d => <option key={d} value={d}>{d}</option>)}
                   </select>
                   <input type="time" className="border rounded p-2 text-sm" value={slot.time} onChange={(e) => handleScheduleChange(idx, "time", e.target.value)} />
                   <button type="button" onClick={() => removeScheduleSlot(idx)} className="text-red-400 hover:text-red-600"><X size={16}/></button>
                </div>
              ))}
              <button type="button" onClick={addScheduleSlot} className="text-xs font-bold text-[#FF4667] flex items-center gap-1 mt-2"><Plus size={12}/> Add Day</button>
           </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3 z-10">
           <Button variant="ghost" onClick={onClose}>Cancel</Button>
           <Button onClick={onSave} className="bg-[#FF4667] hover:bg-[#ff2e53] text-white">
              {isEditing ? "Update Group" : "Add Group to List"}
           </Button>
        </div>

      </div>
    </div>
  );
}