'use client';

import { useField } from 'formik';

export const FormikTextarea = ({ label, rows = 4, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div className="space-y-2">
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 text-right">
        {label}
      </label>
      <textarea
        {...field}
        {...props}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm text-right">{meta.error}</div>
      )}
    </div>
  );
};