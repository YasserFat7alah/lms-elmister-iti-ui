"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Video, Calendar, Clock, PlayCircle, AlertCircle, Radio, CheckCircle2
} from "lucide-react";
import { Spinner } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useGetMyGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { format, isWithinInterval, parse, isPast } from "date-fns";
import { cn } from "@/lib/utils";
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export default function LiveSessionsPage() {
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const { userInfo } = useSelector((state) => state.auth);
    const userId = userInfo?.user?._id;
    const role = userInfo?.user?.role;

    const { data: groupsData, isLoading: groupsLoading } = useGetMyGroupsQuery();
    const allGroups = groupsData?.data || [];

    const myGroups = allGroups.filter(group => {
        if (role === 'admin') return true;
        if (role === 'teacher') return (group.teacherId?._id || group.teacherId) === userId;
        if (role === 'student') return group.students?.some(s => (s._id || s) === userId);
        return false;
    });

    useEffect(() => {
        if (myGroups.length > 0 && !selectedGroupId) {
            setSelectedGroupId(myGroups[0]._id);
        }
    }, [myGroups, selectedGroupId]);

    const {
        data: lessonsData,
        isLoading: lessonsLoading
    } = useGetLessonsByGroupQuery(
        { groupId: selectedGroupId },
        { skip: !selectedGroupId, refetchOnMountOrArgChange: true }
    );

    const rawLessons = lessonsData?.data?.data || [];

    const onlineSessions = rawLessons
        .filter(lesson => lesson.type === 'online')
        .map(lesson => {
            const dateStr = format(new Date(lesson.date), 'yyyy-MM-dd');
            const now = new Date();
            const startDateTime = parse(`${dateStr} ${lesson.startTime}`, 'yyyy-MM-dd HH:mm', new Date());
            const endDateTime = parse(`${dateStr} ${lesson.endTime}`, 'yyyy-MM-dd HH:mm', new Date());

            let status = 'upcoming';
            if (isWithinInterval(now, { start: startDateTime, end: endDateTime })) {
                status = 'live';
            } else if (isPast(endDateTime)) {
                status = 'ended';
            }
            const joinLink = lesson.groupId?.link;

            return { ...lesson, status, joinLink, startDateTime };
        });

    const sortedSessions = onlineSessions.sort((a, b) => {
        if (a.status === 'live') return -1;
        if (b.status === 'live') return 1;
        return new Date(a.date) - new Date(b.date);
    });

    const liveNow = sortedSessions.find(s => s.status === 'live');
    const otherSessions = sortedSessions.filter(s => s._id !== liveNow?._id);

    if (groupsLoading) return <div className="flex justify-center h-screen items-center"><Spinner /></div>;

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 min-h-screen pb-20">

            <Breadcrumbs
                items={[
                    { label: 'Dashboard', href: '/dashboard/student' },
                    { label: 'Live Sessions' }
                ]}
            />

            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {myGroups.map((group) => {
                    const isActive = group._id === selectedGroupId;
                    return (
                        <button
                            key={group._id}
                            onClick={() => setSelectedGroupId(group._id)}
                            className={`
                        whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border
                        ${isActive
                                    ? "bg-[#FF0055] text-white border-[#FF0055] shadow-lg shadow-pink-200 scale-105"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-pink-200 hover:bg-pink-50"}
                    `}
                        >
                            {group.title}
                            {isActive && <CheckCircle2 size={14} className="inline-block ml-2 text-white/80" />}
                        </button>
                    )
                })}

                {myGroups.length === 0 && (
                    <p className="text-gray-400 text-sm">No groups found.</p>
                )}
            </div>

            {liveNow && (
                <div className="animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-1 shadow-2xl">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-4 text-center md:text-left">
                                <Badge className="bg-red-600 text-white px-3 py-1 text-sm animate-pulse border-none">
                                    🔴 LIVE NOW
                                </Badge>
                                <div>
                                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{liveNow.title}</h2>
                                    <p className="text-gray-300 text-lg">
                                        Mr. {liveNow.groupId?.teacherId?.name}
                                    </p>
                                </div>
                                <div className="text-gray-400 font-mono text-sm bg-gray-800/50 px-4 py-2 rounded-lg inline-block">
                                    {liveNow.startTime} - {liveNow.endTime}
                                </div>
                            </div>
                            <Button
                                size="lg"
                                className="bg-[#FF0055] hover:bg-[#ff2e63] text-white text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(255,0,85,0.5)] transition-all hover:scale-105"
                                onClick={() => liveNow.joinLink ? window.open(liveNow.joinLink, '_blank') : alert('Link not added yet!')}
                            >
                                <PlayCircle className="mr-2" size={24} /> Join Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {lessonsLoading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>)
                ) : otherSessions.length > 0 ? (
                    otherSessions.map(session => (
                        <Card key={session._id} className={`border hover:shadow-md transition-all group ${session.status === 'ended' ? 'opacity-70 bg-gray-50' : 'bg-white'}`}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <Badge variant={session.status === 'upcoming' ? 'default' : 'secondary'}
                                        className={session.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}>
                                        {session.status === 'upcoming' ? 'Upcoming' : 'Ended'}
                                    </Badge>
                                    <Video className={session.status === 'upcoming' ? 'text-blue-500' : 'text-gray-400'} size={20} />
                                </div>
                                <CardTitle className="text-lg mt-2 group-hover:text-[#FF0055] transition-colors">{session.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} /> {format(new Date(session.date), "EEEE, d MMM")}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} /> {session.startTime} - {session.endTime}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    {session.status === 'upcoming' ? (
                                        <Button className="w-full bg-white text-gray-400 border border-gray-200 cursor-not-allowed hover:bg-white" disabled>
                                            Not Started Yet
                                        </Button>
                                    ) : (
                                        <Button variant="outline" className="w-full hover:text-[#FF0055] hover:border-[#FF0055]"
                                            disabled={!session.joinLink}
                                            onClick={() => window.open(session.joinLink, '_blank')}>
                                            {session.joinLink ? 'Join Again' : 'Class Ended'}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    !liveNow && (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                <Video className="text-gray-300" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No sessions found</h3>
                            <p className="text-gray-500">There are no online classes scheduled for this group.</p>
                        </div>
                    )
                )}
            </div>

        </div>
    );
}