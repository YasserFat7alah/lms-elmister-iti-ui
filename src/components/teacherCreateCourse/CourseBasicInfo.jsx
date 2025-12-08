import { LayoutDashboard } from "lucide-react";
import { Field } from "formik";
import FormikInput from "@/components/authComponents/FormikInput"; 
import { ArrayInput } from "./FormHelpers"; 

export default function CourseBasicInfo({ values, setFieldValue }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <LayoutDashboard className="text-[#FF4667]" size={20} />
        <h2 className="text-lg font-bold text-gray-800">Basic Information</h2>
      </div>
      <div className="space-y-4">
        <FormikInput name="title" label="Title" placeholder="Course Title" />
        <FormikInput name="subTitle" label="Sub Title" placeholder="Short Brief" />
        <FormikInput name="description" label="Course Description" as="textarea" rows={5} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormikInput name="subject" label="Subject" />
            <FormikInput name="gradeLevel" label="Grade Level" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Language</label>
              <Field as="select" name="courseLanguage" className="h-10 border rounded-md px-3 bg-white focus:ring-[#FF4667]">
                  <option value="English">English</option>
                  <option value="Arabic">Arabic</option>
              </Field>
            </div>
        </div>
        

        <div className="pt-2 border-t mt-2">
           <ArrayInput 
             label="Tags (Keywords)" 
             placeholder="Add tag and press Enter..." 
             name="tags" 
             values={values.tags} 
             setFieldValue={setFieldValue} 
           />
        </div>
      </div>
    </div>
  );
}