import { LayoutDashboard, Plus } from "lucide-react";
import { Field } from "formik";
import FormikInput from "@/components/authComponents/FormikInput";
import { ArrayInput } from "./FormHelpers";
import { Button } from "@/components/ui/button";

const GRADE_LEVELS = [
  "1","2","3","4","5","6",
  "7","8","9","10","11","12"
];

export default function CourseBasicInfo({ values, setFieldValue, onAddGroup }) {
  return (
    <div className="bg-white rounded-2xl border-gray-100 p-6 h-full">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <LayoutDashboard className="text-[#FF4667]" size={20} />
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Basic Information</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <FormikInput
              name="title"
              label="Course Title"
              placeholder="e.g. Physics 2025"
              inputClassName="h-12 text-sm rounded-md"
            />
          </div>

          <div className="md:col-span-3">
            <FormikInput
              name="subTitle"
              label="Sub Title"
              placeholder="Brief tagline"
              inputClassName="h-12 text-sm rounded-md"
            />
          </div>
        </div>

        <div>
          <FormikInput
            name="description"
            label="Full Description"
            as="textarea"
            rows={4}
            inputClassName="min-h-[96px] text-sm rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormikInput name="subject" label="Subject" inputClassName="h-12 text-sm rounded-md" />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Grade Level</label>
            <Field
              as="select"
              name="gradeLevel"
              className="h-12 border rounded-lg px-3 bg-white focus:ring-2 focus:ring-[#FF4667] text-sm"
            >
              <option value="">Select Grade</option>
              {GRADE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </Field>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Language</label>
            <Field
              as="select"
              name="courseLanguage"
              className="h-12 border rounded-lg px-3 bg-white focus:ring-2 focus:ring-[#FF4667] text-sm"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </Field>
          </div>
        </div>

        <div className="pt-4 border-t">
          <label className="text-sm font-medium text-gray-700">Tags (Keywords)</label>

          <div className="mt-2 flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1 min-w-0">
              <ArrayInput
                placeholder="Add tag and press Enter..."
                name="tags"
                values={values.tags}
                setFieldValue={setFieldValue}
                inputClassName="h-11 text-sm rounded-md border px-3 w-full"
                chipContainerClassName="mt-3 flex flex-wrap gap-2"
                labelClassName={null}
              />
            </div>

            {/* <div className="flex-shrink-0 self-start">
              <Button
                type="button"
                onClick={onAddGroup}
                className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-black h-11 mt-5 rounded-md"
              >
                <Plus size={16} />
                <span className="text-sm font-medium">Add Group</span>
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
