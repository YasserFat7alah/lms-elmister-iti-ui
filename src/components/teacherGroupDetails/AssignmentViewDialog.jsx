import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Pencil } from "lucide-react";

const AssignmentViewDialog = ({ isOpen, onClose, assignment, onEdit }) => {
  if (!assignment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assignment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label className="text-gray-500">Title</Label>
            <p className="text-lg font-semibold mt-1">{assignment.title}</p>
          </div>
          
          {assignment.description && (
            <div>
              <Label className="text-gray-500">Description</Label>
              <p className="mt-1">{assignment.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500">Due Date</Label>
              <p className="mt-1 font-medium">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-gray-500">Due Time</Label>
              <p className="mt-1 font-medium">
                {new Date(assignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          
          <div>
            <Label className="text-gray-500">Total Grade</Label>
            <p className="mt-1 font-medium">{assignment.totalGrade} points</p>
          </div>
          
          {assignment.allowLateSubmission && (
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Label className="text-orange-800 font-semibold">Late Submission Policy</Label>
              <div className="mt-2 space-y-1 text-sm text-orange-700">
                <p>• Penalty: {assignment.latePenaltyPerDay}% per day</p>
                <p>• Maximum late days: {assignment.maxLateDays}</p>
              </div>
            </div>
          )}
          
          {assignment.file && (
            <div>
              <Label className="text-gray-500">Attached File</Label>
              <a 
                href={assignment.file.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-blue-700"
              >
                <Download size={16} />
                <span className="text-sm font-medium">Download File</span>
              </a>
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            <Button 
              className="flex-1 bg-[#FF4667] hover:bg-[#FF4667]/90"
              onClick={() => {
                onClose();
                onEdit(assignment);
              }}
            >
              <Pencil size={16} className="mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentViewDialog;