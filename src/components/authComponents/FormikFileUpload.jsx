"use client";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";



//how to use :// <FormikFileUpload
//    name="cv"
//    label="Upload CV"
//  accept=".pdf,.doc,.docx"   //if you need to customize accepted file types
//  />

export default function FormikFileUpload({ label,accept = ".pdf,.doc,.docx" ,...props }) {
  const [field, meta, helpers] = useField(props);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    helpers.setValue(file); 
  };

  return (
    <div className="space-y-1 text-left">
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}

      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className={cn(
          "block w-full text-sm",
          meta.touched && meta.error && "border-red-500 focus-visible:ring-red-500"
        )}
      />

      {field.value && (
        <p className="text-xs text-gray-600">Selected: {field.value.name}</p>
      )}

      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 font-medium">{meta.error}</div>
      ) : null}
    </div>
  );
}
