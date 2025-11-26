"use client";
import { useState } from "react";
import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FormikPassword({ label, ...props }) {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1 text-left">
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <div className="relative">
        <Input
          {...field}
          {...props}
          type={show ? "text" : "password"}
          className={cn(
            meta.touched && meta.error && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          tabIndex="-1"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 font-medium mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
}