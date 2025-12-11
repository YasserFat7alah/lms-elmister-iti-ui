'use client';
import React from 'react';
import { useGetPublicGroupsQuery } from '@/redux/api/endPoints/publicApiSlice';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CourseGroup = ({ courseId, groups, selectedGroup, setSelectedGroup }) => {

  const { data: groupsData, isLoading, isError } = useGetPublicGroupsQuery({ courseId }, {
    skip: !courseId || (groups && groups.length > 0)
  });

  const safeGroups = (groups && groups.length > 0) ? groups : (groupsData?.data || []);

  if (isLoading && (!groups || groups.length === 0)) {
    return <div className="p-8 text-center text-gray-500">Loading schedules...</div>;
  }

  if (safeGroups.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
        <p>No active groups available currently.</p>
      </div>
    );
  }

  const getStatusBadge = (current, max) => {
    const isFull = (current || 0) >= max;
    if (isFull) {
      return <Badge variant="destructive" className="font-bold">Full</Badge>;
    }
    return <Badge className="bg-emerald-500 hover:bg-emerald-600 font-bold">Open</Badge>;
  };

  const getTypeBadge = (capacity) => {
    if (capacity === 1) return <Badge variant="outline" className="border-pink-200 text-pink-700 bg-pink-50">Private</Badge>;
    return <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Shared</Badge>;
  }

  const formatTime = (time24) => {
    if (!time24) return "TBA";
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${suffix}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-2xl">Available Groups</h3>
        <span className="text-sm text-gray-500">{safeGroups.length} options available</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeGroups.map((group) => {
          const isSelected = selectedGroup?._id === group._id;
          return (
            <Card
              key={group._id}
              onClick={() => setSelectedGroup && setSelectedGroup(group)}
              className={`border shadow-sm transition-all duration-300 relative overflow-hidden group cursor-pointer
                      ${isSelected ? 'border-pink-500 ring-2 ring-pink-500 shadow-md bg-pink-50/10' : 'border-gray-200 hover:border-pink-300 hover:shadow-md'}
                  `}
            >
              <CardHeader className="pb-3 pl-5">
                <div className="flex justify-between items-start mb-2">
                  {getTypeBadge(group.capacity)}
                  {getStatusBadge(group.studentsCount, group.capacity)}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1" title={group.title}>
                  {group.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pl-5 space-y-4">

                {group.description && (
                  <p className="text-sm text-gray-600 line-clamp-2" title={group.description}>
                    {group.description}
                  </p>
                )}

                {/* Price Display */}
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-2xl text-pink-600">{group.price || 0}$</span>
                  <span className="text-xs font-medium text-gray-500">/month</span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="flex items-center text-gray-700 gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(group.startingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-700 gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span>{group.studentsCount || 0} / {group.capacity} slots</span>
                  </div>
                </div>

                {/* Working Days / Schedule */}
                {group.schedule && group.schedule.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                      <Calendar size={12} /> Weekly Schedule
                    </p>
                    <div className="space-y-1">
                      {group.schedule.map((slot, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="capitalize font-medium text-gray-700">{slot.day}</span>
                          <span className="text-gray-600 font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-gray-100">{formatTime(slot.time)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {group.lessons && group.lessons.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Curriculum Preview</p>
                      <div className="flex flex-wrap gap-1">
                        {group.lessons.slice(0, 3).sort((a, b) => a.order - b.order).map(lesson => (
                          <Badge key={lesson._id} variant="secondary" className="text-[10px] bg-gray-100 text-gray-600 border-gray-100 font-normal">
                            {lesson.order}. {lesson.title.slice(0, 15)}{lesson.title.length > 15 ? '...' : ''}
                          </Badge>
                        ))}
                        {group.lessons.length > 3 && (
                          <span className="text-[10px] text-gray-400 self-center">+{group.lessons.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseGroup;