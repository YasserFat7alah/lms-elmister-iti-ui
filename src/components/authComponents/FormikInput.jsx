"use client";
import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function FormikInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-1 text-left">
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <Input
        {...field}
        {...props}
        className={cn(
          meta.touched && meta.error && "border-red-500 focus-visible:ring-red-500"
        )}
      />
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 font-medium">{meta.error}</div>
      ) : null}
    </div>
  );
}