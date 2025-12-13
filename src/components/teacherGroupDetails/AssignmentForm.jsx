import React from 'react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Trash2, Eye } from "lucide-react";

const AssignmentForm = ({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  totalGrade,
  setTotalGrade,
  file,
  handleFileChange,
  allowLate,
  setAllowLate,
  latePenaltyPerDay,
  setLatePenaltyPerDay,
  maxLateDays,
  setMaxLateDays,
  onSubmit,
  onCancel,
  isLoading,
  isEditMode = false,
  existingFile = null,
  onRemoveExistingFile = null
}) => {
  return (
    <form className="space-y-4 mt-2" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label>Title *</Label>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="e.g., Homework 1"
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label>Description</Label>
        <Input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description" 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Due Date *</Label>
          <Input 
            type="datetime-local" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label>Total Grade</Label>
          <Input 
            type="number" 
            min="1"
            max="100"
            value={totalGrade} 
            onChange={(e) => setTotalGrade(Number(e.target.value))} 
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Label>{isEditMode ? "Upload New File (Optional)" : "Upload File (Optional)"}</Label>
        
        {/* Display existing file in edit mode */}
        {isEditMode && existingFile && !file && (
          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-md">
                  <FileIcon fileName={existingFile.name} />
                </div>
                <div>
                  <p className="font-medium text-sm">{existingFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {existingFile.size ? formatFileSize(existingFile.size) : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {existingFile.url && (
                  <>
                    <a 
                      href={existingFile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      title="View/Download"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </a>
                    <a 
                      href={existingFile.url} 
                      download
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4 text-gray-600" />
                    </a>
                  </>
                )}
                {onRemoveExistingFile && (
                  <button
                    type="button"
                    onClick={onRemoveExistingFile}
                    className="p-2 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Current file will be kept if no new file is uploaded
            </p>
          </div>
        )}
        
        {/* New file upload input */}
        <Input 
          type="file" 
          onChange={handleFileChange} 
          className={isEditMode && existingFile ? "mt-2" : ""}
        />
        
        {/* Display selected new file */}
        {file && (
          <div className="p-3 border border-blue-200 rounded-md bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-md">
                <FileIcon fileName={file.name} />
              </div>
              <div>
                <p className="font-medium text-sm text-blue-700">New file selected:</p>
                <p className="text-sm text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.size ? formatFileSize(file.size) : ''}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 pt-2" >
        <Checkbox 
          checked={allowLate} 
          onCheckedChange={(checked) => setAllowLate(checked === true)} 
        />
        <Label className="cursor-pointer" onClick={() => setAllowLate(!allowLate)}>Allow Late Submission</Label>
      </div>
      
      {allowLate && (
        <div className="space-y-3 pl-6 border-l-2 border-pink-200">
          <div className="space-y-2">
            <Label>Late Penalty Per Day (%)</Label>
            <Input 
              type="number" 
              min="0"
              max="100"
              value={latePenaltyPerDay} 
              onChange={(e) => setLatePenaltyPerDay(Number(e.target.value))} 
            />
          </div>
          <div className="space-y-2">
            <Label>Max Late Days</Label>
            <Input 
              type="number" 
              min="0"
              value={maxLateDays} 
              onChange={(e) => setMaxLateDays(Number(e.target.value))} 
            />
          </div>
        </div>
      )}
      
      <div className={`flex gap-2 pt-2 ${isEditMode ? 'flex items-center ' : ''}`}>
        {isEditMode && (
          <Button 
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          className={`${isEditMode ? 'flex-1' : 'w-full'}  bg-[#FF4667] hover:bg-[#FF4667]/90`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size={16} className="mr-2" /> 
              {isEditMode ? "Updating..." : "Creating..."}
            </>
          ) : (
            isEditMode ? "Update Assignment" : "Create Assignment"
          )}
        </Button>
      </div>
    </form>
  );
};

// Helper component for file icons
const FileIcon = ({ fileName }) => {
  const extension = fileName?.split('.').pop()?.toLowerCase();
  
  const iconClasses = "h-5 w-5";
  
  switch (extension) {
    case 'pdf':
      return <FileTextIcon className={`${iconClasses} text-red-500`} />;
    case 'doc':
    case 'docx':
      return <FileWordIcon className={`${iconClasses} text-blue-600`} />;
    case 'xls':
    case 'xlsx':
      return <FileExcelIcon className={`${iconClasses} text-green-600`} />;
    case 'ppt':
    case 'pptx':
      return <FilePresentationIcon className={`${iconClasses} text-orange-500`} />;
    case 'zip':
    case 'rar':
      return <ArchiveIcon className={`${iconClasses} text-yellow-600`} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <ImageIcon className={`${iconClasses} text-purple-500`} />;
    default:
      return <FileIconDefault className={`${iconClasses} text-gray-500`} />;
  }
};

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Icon components (you can use actual lucide-react icons or your own)
const FileTextIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const FileWordIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const FileExcelIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const FilePresentationIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const ArchiveIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2H4v8h12V6z" clipRule="evenodd" />
  </svg>
);

const ImageIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
  </svg>
);

const FileIconDefault = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

export default AssignmentForm;