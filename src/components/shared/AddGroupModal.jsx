"use client";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput";
import { useCreateGroupMutation } from "@/redux/api/endPoints/groupsApiSlice";
import { Spinner } from "@/components/shared/Loader";
import { toast } from "react-hot-toast";

const groupSchema = Yup.object().shape({
  name: Yup.string().required("Group name is required"),
  type: Yup.string().oneOf(["online", "offline", "hybrid"]).required(),
  capacity: Yup.number().min(1).required("Capacity is required"),
  price: Yup.number().min(0).required("Price is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  
  meetingUrl: Yup.string().when("type", {
    is: (val) => val === "online" || val === "hybrid",
    then: () => Yup.string().url("Invalid URL").required("Meeting URL is required for Online/Hybrid"),
    otherwise: () => Yup.string().notRequired(),
  }),
  address: Yup.string().when("type", {
    is: (val) => val === "offline" || val === "hybrid",
    then: () => Yup.string().required("Address is required for Offline/Hybrid"),
    otherwise: () => Yup.string().notRequired(),
  }),
  
  schedule: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().required("Day required"),
      from: Yup.string().required("Start time required"),
      to: Yup.string().required("End time required"),
    })
  ).min(1, "At least one schedule day is required"),
});

export default function AddGroupModal({ isOpen, onClose, courseId }) {
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const initialValues = {
    courseId: courseId,
    name: "",
    type: "online", 
    capacity: 20,
    price: 150,
    startDate: "",
    endDate: "",
    meetingUrl: "",
    address: "",
    mapUrl: "", 
    schedule: [{ day: "Monday", from: "14:00", to: "16:00" }], // Default one slot
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createGroup(values).unwrap();
      toast.success("Group added successfully!");
      resetForm();
      onClose(); 
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create group");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Group / Batch</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={groupSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <FormikInput name="name" label="Group Name" placeholder="e.g. Group A (Sun/Tue)" />
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Field as="select" name="type" className="w-full border rounded p-2 h-10">
                    <option value="online">Online</option>
                    <option value="offline">Offline (Center)</option>
                    <option value="hybrid">Hybrid</option>
                  </Field>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <FormikInput name="capacity" type="number" label="Max Students (Capacity)" />
                 <FormikInput name="price" type="number" label="Price (EGP)" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <FormikInput name="startDate" type="date" label="Start Date" />
                 <FormikInput name="endDate" type="date" label="End Date" />
              </div>

              {(values.type === "online" || values.type === "hybrid") && (
                <FormikInput name="meetingUrl" label="Meeting URL (Zoom/Google Meet)" placeholder="https://..." />
              )}

              {(values.type === "offline" || values.type === "hybrid") && (
                <div className="space-y-3 p-3 bg-gray-50 rounded border">
                   <FormikInput name="address" label="Center Address" />
                   <FormikInput name="mapUrl" label="Google Maps Link (Optional)" />
                </div>
              )}

              <div className="border p-4 rounded-lg">
                <label className="block text-sm font-medium mb-2">Weekly Schedule</label>
                <FieldArray name="schedule">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      {values.schedule.map((slot, index) => (
                        <div key={index} className="flex gap-2 items-end">
                           <div className="w-1/3">
                             <Field as="select" name={`schedule.${index}.day`} className="w-full border rounded p-2 text-sm">
                               <option value="Saturday">Saturday</option>
                               <option value="Sunday">Sunday</option>
                               <option value="Monday">Monday</option>
                               <option value="Tuesday">Tuesday</option>
                               <option value="Wednesday">Wednesday</option>
                               <option value="Thursday">Thursday</option>
                               <option value="Friday">Friday</option>
                             </Field>
                           </div>
                           <div className="w-1/4">
                             <Field type="time" name={`schedule.${index}.from`} className="w-full border rounded p-2 text-sm" />
                           </div>
                           <span className="mb-2">-</span>
                           <div className="w-1/4">
                             <Field type="time" name={`schedule.${index}.to`} className="w-full border rounded p-2 text-sm" />
                           </div>
                           
                           {values.schedule.length > 1 && (
                             <button type="button" onClick={() => remove(index)} className="text-red-500 text-sm font-bold px-2 mb-2">X</button>
                           )}
                        </div>
                      ))}
                      
                      <button 
                        type="button" 
                        onClick={() => push({ day: "Monday", from: "14:00", to: "16:00" })}
                        className="text-sm text-[#FF4667] font-medium mt-2 hover:underline"
                      >
                        + Add Another Day
                      </button>
                    </div>
                  )}
                </FieldArray>
                 {typeof errors.schedule === 'string' && <div className="text-red-500 text-xs mt-1">{errors.schedule}</div>}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-[#FF4667] text-white">
                {isLoading ? <Spinner className="text-white" /> : "Create Group"}
              </Button>

            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}