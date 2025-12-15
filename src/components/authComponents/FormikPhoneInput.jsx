"use client";
import React from "react";
import { useField, useFormikContext } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FormikPhoneInput = ({ label, name, ...props }) => {
    const [field, meta] = useField(name);
    const { setFieldValue, setFieldTouched } = useFormikContext();

    const handleChange = (value) => {
        setFieldValue(name, value);
    };

    const handleBlur = () => {
        setFieldTouched(name, true);
    };

    return (
        <div className="space-y-1 text-left">
            {label && (
                <Label htmlFor={name} className={cn(meta.touched && meta.error && "text-red-500")}>
                    {label}
                </Label>
            )}
            <div className={cn(
                "relative rounded-md",
                meta.touched && meta.error && "phone-input-error"
            )}>
                <PhoneInput
                    country={"eg"}
                    value={field.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputClass={cn(
                        "!w-full !h-10 !text-sm !rounded-md !border-input !bg-background !px-3 !py-2 !pl-[48px] !ring-offset-background file:!border-0 file:!bg-transparent file:!text-sm file:!font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50",
                        meta.touched && meta.error && "!border-red-500 focus-visible:!ring-red-500"
                    )}
                    buttonClass={cn(
                        "!border-input !rounded-l-md !bg-background hover:!bg-accent hover:!text-accent-foreground",
                        meta.touched && meta.error && "!border-red-500"
                    )}
                    dropdownClass="!bg-background !text-foreground !border-input !shadow-md !rounded-md"
                    searchClass="!bg-background !text-foreground !p-2"
                    enableSearch
                    disableSearchIcon
                    {...props}
                />
            </div>
            <div className="text-xs text-red-500 font-medium min-h-[1.25rem]">
                {meta.touched && meta.error ? meta.error : ""}
            </div>
            <style jsx global>{`
        .phone-input-error .react-tel-input .form-control {
          border-color: #ef4444 !important;
        }
        .phone-input-error .react-tel-input .flag-dropdown {
          border-color: #ef4444 !important;
        }
      `}</style>
        </div>
    );
};

export default FormikPhoneInput;
