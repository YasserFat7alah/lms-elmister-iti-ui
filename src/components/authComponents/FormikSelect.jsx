"use client";
import { useField, useFormikContext } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FormikSelect = ({ label, name, options, placeholder, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleValueChange = (val) => {
    setFieldValue(name, val);
  };

  const handleOpenChange = (open) => {
    if (!open) {
      setFieldTouched(name, true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className={meta.touched && meta.error ? "text-red-500" : ""}>
        {label}
      </Label>
      
      <Select 
        onValueChange={handleValueChange} 
        onOpenChange={handleOpenChange}
        defaultValue={field.value}
        value={field.value}
      >
        <SelectTrigger 
          id={name} 
          className={meta.touched && meta.error ? "border-red-500" : ""}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {meta.touched && meta.error && (
        <span className="text-sm text-red-500">{meta.error}</span>
      )}
    </div>
  );
};

export default FormikSelect;