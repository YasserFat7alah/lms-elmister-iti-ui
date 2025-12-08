import { Clock, Plus, Edit3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormHelpers from "./FormHelpers";
import { SimpleInput } from "./FormHelpers";

const DAY_MAP_TO_BACKEND = { "Saturday": "sat", "Sunday": "sun", "Monday": "mon", "Tuesday": "tue", "Wednesday": "wed", "Thursday": "thu", "Friday": "fri" };

export default function GroupForm({ 
  tempGroup, 
  setTempGroup, 
  onSave, 
  onCancel, 
  isLoading, 
  isEditing = false 
}) {
  
  const handleScheduleChange = (idx, field, val) => {
    const newSched = [...tempGroup.schedule];
    newSched[idx][field] = val;
    setTempGroup({ ...tempGroup, schedule: newSched });
  };

  const addScheduleSlot = () => setTempGroup({ ...tempGroup, schedule: [...tempGroup.schedule, { day: "Monday", time: "14:00" }] });
  
  const removeScheduleSlot = (idx) => { 
    if(tempGroup.schedule.length > 1) setTempGroup({...tempGroup, schedule: tempGroup.schedule.filter((_, i) => i !== idx)}); 
  };

  return (
    <div id="group-form-section" className={`p-5 rounded-xl border transition-all ${isEditing ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-dashed border-gray-300"}`}>
      
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            {isEditing ? <><Edit3 size={16}/> Edit Batch</> : <><Plus size={16}/> Add New Batch</>}
          </h3>
          {isEditing && (
            <button type="button" onClick={onCancel} className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1">
               <X size={14}/> Cancel Edit
            </button>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SimpleInput label="Group Title (> 5 chars)" value={tempGroup.title} onChange={(e)=>setTempGroup({...tempGroup, title: e.target.value})} placeholder="e.g. Group A" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Type</label>
          <select className="h-10 border rounded px-2 bg-white" value={tempGroup.type} onChange={(e)=>setTempGroup({...tempGroup, type: e.target.value})}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <SimpleInput label="Group Description (Optional)" as="textarea" rows={2} value={tempGroup.description} onChange={(e)=>setTempGroup({...tempGroup, description: e.target.value})} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SimpleInput label="Price (EGP)" type="number" value={tempGroup.price} onChange={(e)=>setTempGroup({...tempGroup, price: e.target.value})} />
        <SimpleInput label="Capacity" type="number" value={tempGroup.capacity} onChange={(e)=>setTempGroup({...tempGroup, capacity: e.target.value})} />
        <SimpleInput label="Start Date" type="date" value={tempGroup.startingDate} onChange={(e)=>setTempGroup({...tempGroup, startingDate: e.target.value})} />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
          {(tempGroup.type === "online" || tempGroup.type === "hybrid") && (
              <SimpleInput label="Meeting Link" value={tempGroup.link} onChange={(e)=>setTempGroup({...tempGroup, link: e.target.value})} placeholder="https://..." />
          )}
          {(tempGroup.type === "offline" || tempGroup.type === "hybrid") && (
              <SimpleInput label="Center Location" value={tempGroup.location} onChange={(e)=>setTempGroup({...tempGroup, location: e.target.value})} placeholder="Full address..." />
          )}
      </div>

      <div className="bg-white p-3 rounded border mb-4">
        <label className="text-xs font-bold text-gray-500 mb-2 block flex items-center gap-1"><Clock size={12}/> SCHEDULE</label>
        {tempGroup.schedule.map((slot, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-2">
             <select className="w-1/3 text-xs border rounded p-2" value={slot.day} onChange={(e) => handleScheduleChange(idx, "day", e.target.value)}>
                {Object.keys(DAY_MAP_TO_BACKEND).map(d => <option key={d} value={d}>{d}</option>)}
             </select>
             <input type="time" className="border rounded p-1 text-xs" value={slot.time} onChange={(e) => handleScheduleChange(idx, "time", e.target.value)} />
             <button type="button" onClick={() => removeScheduleSlot(idx)} className="text-red-400 hover:text-red-600"><X size={14}/></button>
          </div>
        ))}
        <button type="button" onClick={addScheduleSlot} className="text-xs font-bold text-[#FF4667]">+ Add Day</button>
      </div>

      <Button type="button" onClick={onSave} disabled={isLoading} className={`w-full text-white ${isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-black"}`}>
         {isLoading ? "Saving..." : isEditing ? "Update Group Details" : "Add Group to List"}
      </Button>
    </div>
  );
}