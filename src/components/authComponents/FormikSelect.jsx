"use client";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function FormikSelect({ label, placeholder, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="space-y-1 text-left">
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <Select
        onValueChange={(value) => helpers.setValue(value)}
        defaultValue={field.value}
      >
        <SelectTrigger
          className={cn(
            meta.touched && meta.error && "border-red-500 focus:ring-red-500"
          )}
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
      
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 font-medium">{meta.error}</div>
      ) : null}
    </div>
  );
}