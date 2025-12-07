'use client';
import React from 'react';
import { X, Calendar, Clock, Users, BookOpen } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/authComponents/FormikInput"; 

const eventSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  group: Yup.string().required('Group is required'),
  day: Yup.string().required('Day is required'),
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string().required('End time is required'),
  type: Yup.string().required('Type is required'),
});

export default function AddEventModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const initialValues = {
    subject: '',
    group: '',
    day: 'sat',
    startTime: '',
    endTime: '',
    type: 'center', 
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("New Event Data:", values);
    // await addEvent(values);
    
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div>
                <h2 className="text-lg font-bold text-gray-900">Add New Class</h2>
                <p className="text-xs text-gray-500">Schedule a new session for your students</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
            </button>
        </div>

        <div className="p-6">
            <Formik
                initialValues={initialValues}
                validationSchema={eventSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, handleChange, handleBlur }) => (
                    <Form className="space-y-4">
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <FormikInput label="Subject Name" name="subject" placeholder="e.g. Physics" icon={<BookOpen size={14}/>} />
                            </div>
                            <div>
                                <FormikInput label="Group Name" name="group" placeholder="e.g. Group A" icon={<Users size={14}/>} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Day</label>
                            <div className="relative">
                                <select 
                                    name="day"
                                    value={values.day}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] outline-none appearance-none cursor-pointer"
                                >
                                    <option value="sat">Saturday</option>
                                    <option value="sun">Sunday</option>
                                    <option value="mon">Monday</option>
                                    <option value="tue">Tuesday</option>
                                    <option value="wed">Wednesday</option>
                                    <option value="thu">Thursday</option>
                                    <option value="fri">Friday</option>
                                </select>
                                <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Time</label>
                                <input 
                                    type="time" 
                                    name="startTime"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF0055] outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Time</label>
                                <input 
                                    type="time" 
                                    name="endTime"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF0055] outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class Type</label>
                            <div className="flex gap-4">
                                <label className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 transition-all ${values.type === 'center' ? 'border-[#FF0055] bg-pink-50 text-[#FF0055]' : 'border-gray-200 text-gray-600'}`}>
                                    <input type="radio" name="type" value="center" onChange={handleChange} className="hidden" />
                                    <span className="font-semibold text-sm">In Center</span>
                                </label>
                                <label className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 transition-all ${values.type === 'online' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600'}`}>
                                    <input type="radio" name="type" value="online" onChange={handleChange} className="hidden" />
                                    <span className="font-semibold text-sm">Online</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-[#FF0055] hover:bg-pink-700 text-white">
                                {isSubmitting ? 'Saving...' : 'Add Class'}
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
      </div>
    </div>
  );
}