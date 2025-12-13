'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
  MapPin, Video, Clock, Calendar as CalendarIcon, 
  Plus, ChevronLeft, ChevronRight, RotateCcw,
  LayoutGrid, LayoutList 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-hot-toast";

import { useGetAllMyLessonsQuery, useCreateLessonMutation } from "@/redux/api/endPoints/lessonsApiSlice";
import { useGetAllGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";
import CreateSessionModal from '../teacherGroupDetails/CreateSessionModal';

const localizer = momentLocalizer(moment);

const dayMap = { "sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6 };

const getPastelColors = (groupId) => {
    const palettes = [
      { bg: '#F3E8FF', border: '#A855F7', text: '#6B21A8' },
      { bg: '#FCE7F3', border: '#EC4899', text: '#9D174D' }, 
      { bg: '#D1FAE5', border: '#10B981', text: '#047857' }, 
      { bg: '#FFEDD5', border: '#F97316', text: '#C2410C' }, 
    ];
    let hash = 0;
    const str = (groupId || 'default').toString();
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return palettes[Math.abs(hash) % palettes.length];
};

const generateGhostEvents = (groups, existingLessons, currentDate) => {
  const ghostEvents = [];
  const startCalc = moment(currentDate).clone().subtract(2, 'months').toDate();
  const endCalc = moment(currentDate).clone().add(4, 'months').toDate();

  groups.forEach(group => {
    if (!group.startingDate || !group.schedule || group.schedule.length === 0) return;

    let current = new Date(group.startingDate);
    
    let groupEnd;
    if (group.endDate) {
        groupEnd = new Date(group.endDate);
    } else {
        groupEnd = moment(group.startingDate).add(3, 'months').toDate();
    }

    const finalDate = groupEnd < endCalc ? groupEnd : endCalc;

    while (current <= finalDate) {
      if (current >= startCalc) { 
        const dayIndex = current.getDay();
        const dayName = Object.keys(dayMap).find(key => dayMap[key] === dayIndex); 
        
        const scheduleSlot = group.schedule.find(s => s.day === dayName);
        
        if (scheduleSlot) {
            const dateStr = moment(current).format('YYYY-MM-DD');
            
            const isRealExists = existingLessons.some(l => 
                l.groupId?._id === group._id && 
                moment(l.date).format('YYYY-MM-DD') === dateStr
            );

            if (!isRealExists) {
                const colors = getPastelColors(group._id);
                const startDateTime = moment(`${dateStr} ${scheduleSlot.time || scheduleSlot.startTime}`, 'YYYY-MM-DD HH:mm').toDate();
                const endDateTime = moment(startDateTime).add(2, 'hours').toDate();

                ghostEvents.push({
                    id: `ghost-${group._id}-${dateStr}`,
                    title: group.title,
                    start: startDateTime,
                    end: endDateTime,
                    isGhost: true, 
                    resource: {
                        groupId: group._id, 
                        groupTitle: group.title,
                        type: group.type,
                        startTime: scheduleSlot.time || scheduleSlot.startTime,
                        endTime: "00:00",
                        bgColor: colors.bg,
                        borderColor: colors.border,
                        textColor: colors.text,
                        location: group.location,
                        meetingLink: group.link,
                        isGhost: true
                    }
                });
            }
        }
      }
      current.setDate(current.getDate() + 1);
    }
  });
  return ghostEvents;
};


const CustomToolbar = ({ label, onNavigate, onView, view, onAddEvent, canAdd }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 px-2 gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-1">
            <button onClick={() => onNavigate('TODAY')} className="p-2 hover:bg-gray-100 text-gray-600 rounded-md transition mr-2" title="Today">
                <RotateCcw size={16} />
            </button>
            <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
            <button onClick={() => onNavigate('PREV')} className="p-2 hover:bg-gray-100 text-gray-600 rounded-md transition">
                <ChevronLeft size={20} />
            </button>
            <div className="px-4 min-w-[200px] flex justify-center text-center text-sm font-bold text-gray-700">
               {label}
            </div>
            <button onClick={() => onNavigate('NEXT')} className="p-2 hover:bg-gray-100 text-gray-600 rounded-md transition">
                <ChevronRight size={20} />
            </button>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button onClick={() => onView('month')} className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-2 transition-all ${view === 'month' ? 'bg-white text-[#FF0055] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <LayoutGrid size={14} /> Month
            </button>
            <button onClick={() => onView('week')} className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-2 transition-all ${view === 'week' ? 'bg-white text-[#FF0055] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <LayoutList size={14} /> Week
            </button>
        </div>
      </div>

      {canAdd && (
          <Button onClick={onAddEvent} className="bg-[#FF0055] hover:bg-pink-700 text-white rounded-lg shadow-md shadow-pink-200 h-10 px-5 flex items-center gap-2">
            <Plus size={18} /> <span>Add Session</span>
          </Button>
      )}
    </div>
  );
};

const EventDetailCard = ({ event }) => {
    const { title, resource } = event;
    const { type, location, meetingLink, userRole, groupTitle, isGhost } = resource;
    
    const timeStr = `${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}`;
    const dateStr = moment(event.start).format('dddd, D MMMM YYYY');

    const handleJoin = () => {
       if(isGhost) return; 
       let url = type === 'online' ? meetingLink : location;
       if (!url) return;
       if (type !== 'online') { url = `https://maps.google.com/?q=${encodeURIComponent(url)}`; } 
       else if (!url.match(/^https?:\/\//i)) { url = `https://${url}`; }
       window.open(url, '_blank');
    };

    return (
      <div className="w-[300px] font-sans">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-gray-900 leading-tight">
                  {title} {isGhost && <span className="text-[10px] text-gray-400 font-normal">(Planned)</span>}
              </h3>
              <p className="text-xs font-semibold text-[#FF0055] bg-pink-50 px-2 py-1 rounded-md mt-1 inline-block">{groupTitle}</p>
            </div>
            <div className={`p-2 rounded-lg ${type === 'online' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>{type === 'online' ? <Video size={18} /> : <MapPin size={18} />}</div>
          </div>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-gray-600"><CalendarIcon className="w-4 h-4 text-gray-400" /><span>{dateStr}</span></div>
            <div className="flex items-center gap-3 text-sm text-gray-600"><Clock className="w-4 h-4 text-gray-400" /><span>{timeStr}</span></div>
            <div className="flex items-center gap-3 text-sm text-gray-600">{type === 'online' ? <Video className="w-4 h-4 text-gray-400"/> : <MapPin className="w-4 h-4 text-gray-400"/>}<span className="truncate max-w-[200px]">{type === 'online' ? 'Online Meeting' : location || 'Center'}</span></div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div className="flex -space-x-2">{[1,2,3].map(i => (<Avatar key={i} className="w-6 h-6 border-2 border-white"><AvatarFallback className="text-[9px] bg-gray-200">ST</AvatarFallback></Avatar>))}<div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] text-gray-500">+5</div></div>
              
              {!isGhost && (userRole === 'student' || userRole === 'teacher') && (
                  <Button onClick={handleJoin} size="sm" className="bg-[#FF0055] hover:bg-pink-700 text-white text-xs h-8 px-4 rounded-lg shadow-md shadow-pink-100">{type === 'online' ? 'Join' : 'Map'}</Button>
              )}
              {isGhost && <span className="text-xs text-gray-400 italic">Upcoming</span>}
          </div>
        </div>
      </div>
    );
};

const CustomEvent = ({ event }) => {
  const { title, resource, isGhost } = event;
  const { start, end } = event;
  const { bgColor, borderColor, textColor } = resource;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div 
          className={`h-full w-full p-1.5 rounded-md border-l-[4px] cursor-pointer transition-all flex flex-col justify-start relative group overflow-hidden ${isGhost ? 'opacity-70 border-dashed bg-gray-50' : ''}`}
          style={{ backgroundColor: isGhost ? '#f9fafb' : bgColor, borderLeftColor: isGhost ? '#9ca3af' : borderColor }}
        >
          {isGhost && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-gray-400" />}
          <div className="hidden md:block text-[10px] font-bold uppercase tracking-wide mb-0.5 opacity-70" style={{ color: isGhost ? '#6b7280' : textColor }}>
            {resource.groupTitle}
          </div>
          <div className="text-[10px] md:text-xs font-bold leading-tight truncate" style={{ color: isGhost ? '#374151' : textColor }}>
            {title}
          </div>
          <div className="hidden md:flex items-center gap-1 text-[10px] font-medium mt-auto" style={{ color: isGhost ? '#6b7280' : textColor }}>
            <Clock size={10} />
            <span>{moment(start).format('h:mm')} - {moment(end).format('h:mm A')}</span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none shadow-xl rounded-xl w-[320px]" align="start" side="right" sideOffset={10}>
        <EventDetailCard event={event} />
      </PopoverContent>
    </Popover>
  );
};

const MonthEvent = ({ event }) => {
    const { title, resource, isGhost } = event;
    const { bgColor, borderColor, textColor } = resource;
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div 
            className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer hover:opacity-80 transition-all w-full overflow-hidden ${isGhost ? 'opacity-60' : ''}`}
            style={{ backgroundColor: isGhost ? '#f3f4f6' : bgColor }}
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: isGhost ? '#9ca3af' : borderColor }} />
            <span className="text-[10px] font-semibold truncate leading-tight" style={{ color: isGhost ? '#4b5563' : textColor }}>
              {title}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-none shadow-xl rounded-xl w-[320px]" align="center" side="bottom" sideOffset={10}>
          <EventDetailCard event={event} />
        </PopoverContent>
      </Popover>
    );
};

export default function WeeklySchedule() {
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.user?.role;
  const canAddEvent = role === 'admin' || role === 'teacher';
  
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week'); 

  const teacherId = useMemo(() => {
    if (userInfo?.accessToken) {
      try {
        const tokenParts = userInfo.accessToken.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          return payload.id || payload._id;
        }
      } catch (e) {
      }
    }
    return userInfo?.user?.user || userInfo?.user?._id || userInfo?._id;
  }, [userInfo]);

  const { data: lessonsData, refetch } = useGetAllMyLessonsQuery(undefined, { refetchOnMountOrArgChange: true });
  
  const { data: groupsData } = useGetAllGroupsQuery(
      role === 'teacher' ? { teacherId: teacherId } : {}, 
      { 
        skip: (role !== 'teacher' && role !== 'admin') || !teacherId,
        refetchOnMountOrArgChange: true
      } 
  );

  const [createLesson] = useCreateLessonMutation();

  const rawLessons = lessonsData?.data || []; 
  const rawGroups = groupsData?.data || [];

  const calendarEvents = useMemo(() => {
    const realEvents = rawLessons.map(lesson => {
      const dateVal = lesson.date?.$date || lesson.date;
      if (!dateVal) return null;
      const dateStr = moment(dateVal).format('YYYY-MM-DD');
      const colors = getPastelColors(lesson.groupId?._id || lesson.groupId);

      return {
        id: lesson._id,
        title: lesson.title,
        start: moment(`${dateStr} ${lesson.startTime}`, 'YYYY-MM-DD HH:mm').toDate(),
        end: moment(`${dateStr} ${lesson.endTime}`, 'YYYY-MM-DD HH:mm').toDate(),
        isGhost: false,
        resource: {
          ...lesson,
          userRole: role,
          groupTitle: lesson.groupId?.title,
          bgColor: colors.bg,
          borderColor: colors.border,
          textColor: colors.text
        }
      };
    }).filter(Boolean);

    let allEvents = [...realEvents];
    if ((role === 'teacher' || role === 'admin') && rawGroups.length > 0) {
        const ghosts = generateGhostEvents(rawGroups, rawLessons, currentDate);
        allEvents = [...allEvents, ...ghosts];
    }

    return allEvents;
  }, [rawLessons, rawGroups, role, currentDate]);

  useEffect(() => {
    if (role !== 'teacher' && role !== 'admin') return;
    if (calendarEvents.length === 0) return;

    const todayStr = moment().format('YYYY-MM-DD');
    const ghostsToday = calendarEvents.filter(event => 
        event.isGhost && moment(event.start).format('YYYY-MM-DD') === todayStr
    );

    if (ghostsToday.length > 0) {
        const toastId = toast.loading("Activating today's sessions...", { id: "auto-create" });
        
        Promise.all(ghostsToday.map(ghost => {
            return createLesson({
                title: `Session: ${ghost.title}`, 
                date: moment(ghost.start).format('YYYY-MM-DD'),
                startTime: ghost.resource.startTime,
                endTime: "16:00", 
                type: ghost.resource.type || 'online',
                groupId: ghost.resource.groupId,
                location: ghost.resource.location,
                meetingLink: ghost.resource.meetingLink,
                order: 99
            }).unwrap().catch(e => console.error("Auto-create error", e));
        })).then(() => {
            toast.success("Today's sessions are now active!", { id: "auto-create" });
            refetch(); 
        });
    }
  }, [calendarEvents.length, role, currentDate, createLesson, refetch]);


  const handleNavigate = useCallback((newDate) => setCurrentDate(newDate), []);
  const handleViewChange = useCallback((newView) => setView(newView), []);

  const { components } = useMemo(() => ({
    components: {
      toolbar: (props) => (
         <CustomToolbar 
            {...props}
            view={view}
            onView={handleViewChange}
            onAddEvent={() => setIsAddEventOpen(true)} 
            canAdd={canAddEvent} 
         />
      ),
      event: view === 'month' ? MonthEvent : CustomEvent
    }
  }), [canAddEvent, view, handleViewChange]);

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-[#F8F9FA]">
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[850px] weekly-schedule-wrapper">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            
            views={['month', 'week']} 
            view={view}              
            onView={handleViewChange} 
            
            date={currentDate} 
            onNavigate={handleNavigate}

            step={60} 
            timeslots={1}
            min={new Date(0, 0, 0, 8, 0, 0)} 
            max={new Date(0, 0, 0, 23, 0, 0)}
            
            components={components}
            
            formats={{
               dayFormat: (date, culture, localizer) => localizer.format(date, 'ddd D', culture),
               monthHeaderFormat: (date, culture, localizer) => localizer.format(date, 'MMMM YYYY', culture),
               dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
                 `${localizer.format(start, 'MMM DD', culture)} — ${localizer.format(end, 'MMM DD, YYYY', culture)}`,
            }}
          />
      </div>

      {isAddEventOpen && (
        <CreateSessionModal
          isOpen={isAddEventOpen}
          onClose={() => setIsAddEventOpen(false)}
          onSuccess={() => { setIsAddEventOpen(false); refetch(); }}
        />
      )}

      <style jsx global>{`
        .weekly-schedule-wrapper .rbc-header {
          border-bottom: none;
          padding: 15px 0;
          font-weight: 600;
          color: #6B21A8;
          font-size: 0.9rem;
          text-transform: uppercase;
        }
        .weekly-schedule-wrapper .rbc-month-view {
            border: 1px solid #F3F4F6;
            border-radius: 16px;
            overflow: hidden;
        }
        .weekly-schedule-wrapper .rbc-time-view {
          border: 1px solid #F3F4F6;
          border-radius: 16px;
          overflow: hidden;
        }
        .weekly-schedule-wrapper .rbc-month-view .rbc-event {
            padding: 1px !important;
            border-radius: 4px;
        }
        .weekly-schedule-wrapper .rbc-row-segment {
            padding: 0 2px; 
        }
        .rbc-toolbar { display: none !important; }
      `}</style>
    </div>
  );
}