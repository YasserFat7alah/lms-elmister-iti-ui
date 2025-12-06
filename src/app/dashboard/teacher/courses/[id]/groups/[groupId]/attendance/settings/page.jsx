"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Save, Settings, Bell, Clock, Calendar,
    Users, CheckCircle, XCircle, AlertCircle, Shield,
    Mail, MessageSquare, Download, Upload, RefreshCw,
    ChevronDown, Eye, Edit, Trash2, Plus
} from "lucide-react";

const AttendanceSettingsPage = () => {
    const router = useRouter();

    const [settings, setSettings] = useState({
        // General Settings
        autoMarkAbsent: true,
        autoMarkAbsentAfter: 15, // minutes
        allowLateCheckIn: true,
        lateThreshold: 10, // minutes
        requireNotesForAbsence: true,
        requireExcuseForAbsence: true,

        // Notification Settings
        sendAbsenceNotifications: true,
        sendLateNotifications: true,
        notificationMethod: "email", // email, sms, both
        sendDailySummary: true,
        summaryRecipients: ["instructors", "admins"],

        // Integration Settings
        syncWithCalendar: true,
        enableQRCodeCheckIn: false,
        enableBiometricCheckIn: false,
        enableAutoAttendance: false,

        // Policy Settings
        maxAbsencesBeforeWarning: 3,
        maxAbsencesBeforeAction: 5,
        autoGenerateCertificates: true,
        certificateThreshold: 80, // percentage

        // Display Settings
        showAttendanceToStudents: true,
        showDetailedReports: false,
        defaultView: "daily", // daily, weekly, monthly
        themeColor: "#3B82F6"
    });

    const [notificationTemplates, setNotificationTemplates] = useState([
        {
            id: 1,
            name: "Absence Notification",
            type: "email",
            subject: "Attendance Notice - Absence Recorded",
            content: "Dear {student_name},\n\nYou were marked absent for {course_name} on {date}. Please review the attendance policy.\n\nBest regards,\n{instructor_name}",
            enabled: true
        },
        {
            id: 2,
            name: "Late Check-in Alert",
            type: "sms",
            content: "Hi {student_name}, you were marked late for {course_name}. Check-in time: {check_in_time}",
            enabled: true
        },
        {
            id: 3,
            name: "Weekly Attendance Summary",
            type: "email",
            subject: "Weekly Attendance Summary - {week_date}",
            content: "Dear {student_name},\n\nHere's your attendance summary for the week:\nPresent: {present_count}\nAbsent: {absent_count}\nLate: {late_count}\nRate: {attendance_rate}%\n\nKeep up the good work!\n{instructor_name}",
            enabled: false
        }
    ]);

    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General" },
        { id: "notifications", label: "Notifications" },
        { id: "templates", label: "Templates" },
        { id: "integration", label: "Integration" },
        { id: "policy", label: "Policy" }
    ];

    const handleSettingChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleTemplateChange = (id, field, value) => {
        setNotificationTemplates(prev =>
            prev.map(template =>
                template.id === id ? { ...template, [field]: value } : template
            )
        );
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            // Save settings to API
            console.log("Saving settings:", settings);
            console.log("Saving templates:", notificationTemplates);

            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("Settings saved successfully!");

        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleResetSettings = () => {
        if (confirm("Are you sure you want to reset all settings to default?")) {
            // Reset to default settings
            const defaultSettings = {
                autoMarkAbsent: true,
                autoMarkAbsentAfter: 15,
                allowLateCheckIn: true,
                lateThreshold: 10,
                requireNotesForAbsence: true,
                requireExcuseForAbsence: true,
                sendAbsenceNotifications: true,
                sendLateNotifications: true,
                notificationMethod: "email",
                sendDailySummary: true,
                summaryRecipients: ["instructors", "admins"],
                syncWithCalendar: true,
                enableQRCodeCheckIn: false,
                enableBiometricCheckIn: false,
                enableAutoAttendance: false,
                maxAbsencesBeforeWarning: 3,
                maxAbsencesBeforeAction: 5,
                autoGenerateCertificates: true,
                certificateThreshold: 80,
                showAttendanceToStudents: true,
                showDetailedReports: false,
                defaultView: "daily",
                themeColor: "#3B82F6"
            };

            setSettings(defaultSettings);
            alert("Settings reset to default values.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Link href="/attendance">
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft size={20} />
                                <span>Back to Attendance</span>
                            </button>
                        </Link>

                        <div className="h-6 w-px bg-gray-300"></div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Attendance Settings</h1>
                            <p className="text-gray-600">Configure attendance tracking and notification settings</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleResetSettings}
                            className="flex items-center gap-2 text-red-600 hover:text-red-800 px-3 py-2 border border-red-200 rounded-lg"
                        >
                            <RefreshCw size={16} />
                            <span>Reset to Default</span>
                        </button>

                        <button
                            onClick={handleSaveSettings}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Save size={16} />
                            <span>{isSaving ? "Saving..." : "Save Settings"}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6 rtl:space-x-reverse overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* General Settings */}
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-800">Auto-mark Absent</div>
                                            <p className="text-sm text-gray-600">Automatically mark students as absent if not checked in</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.autoMarkAbsent}
                                                onChange={(e) => handleSettingChange('autoMarkAbsent', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    {settings.autoMarkAbsent && (
                                        <div className="pl-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Auto-mark absent after (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                value={settings.autoMarkAbsentAfter}
                                                onChange={(e) => handleSettingChange('autoMarkAbsentAfter', parseInt(e.target.value))}
                                                className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                                                min="1"
                                                max="60"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-800">Allow Late Check-in</div>
                                            <p className="text-sm text-gray-600">Allow students to check in after session start</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.allowLateCheckIn}
                                                onChange={(e) => handleSettingChange('allowLateCheckIn', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    {settings.allowLateCheckIn && (
                                        <div className="pl-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Late threshold (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                value={settings.lateThreshold}
                                                onChange={(e) => handleSettingChange('lateThreshold', parseInt(e.target.value))}
                                                className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                                                min="1"
                                                max="60"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-800">Require Notes for Absence</div>
                                            <p className="text-sm text-gray-600">Require instructors to add notes when marking absent</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.requireNotesForAbsence}
                                                onChange={(e) => handleSettingChange('requireNotesForAbsence', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-800">Show Attendance to Students</div>
                                            <p className="text-sm text-gray-600">Allow students to view their own attendance records</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.showAttendanceToStudents}
                                                onChange={(e) => handleSettingChange('showAttendanceToStudents', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Display Settings */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-3">Display Settings</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Default View
                                        </label>
                                        <select
                                            value={settings.defaultView}
                                            onChange={(e) => handleSettingChange('defaultView', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        >
                                            <option value="daily">Daily View</option>
                                            <option value="weekly">Weekly View</option>
                                            <option value="monthly">Monthly View</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Theme Color
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={settings.themeColor}
                                                onChange={(e) => handleSettingChange('themeColor', e.target.value)}
                                                className="w-10 h-10 rounded cursor-pointer"
                                            />
                                            <span className="text-sm text-gray-600">{settings.themeColor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === "notifications" && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-800">Send Absence Notifications</div>
                                            <p className="text-sm text-gray-600">Notify students when marked absent</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.sendAbsenceNotifications}
                                                onChange={(e) => handleSettingChange('sendAbsenceNotifications', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-800">Send Late Notifications</div>
                                            <p className="text-sm text-gray-600">Notify students when marked late</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.sendLateNotifications}
                                                onChange={(e) => handleSettingChange('sendLateNotifications', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-800">Send Daily Summary</div>
                                            <p className="text-sm text-gray-600">Send daily attendance summary to instructors</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.sendDailySummary}
                                                onChange={(e) => handleSettingChange('sendDailySummary', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Notification Method
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {['email', 'sms', 'both'].map((method) => (
                                                <button
                                                    key={method}
                                                    onClick={() => handleSettingChange('notificationMethod', method)}
                                                    className={`px-4 py-2 rounded-lg ${settings.notificationMethod === method
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {method.charAt(0).toUpperCase() + method.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Template Settings */}
                    {activeTab === "templates" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">Notification Templates</h3>
                                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                                    <Plus size={16} />
                                    <span>Add Template</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {notificationTemplates.map((template) => (
                                    <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="font-medium text-gray-800">{template.name}</div>
                                                <div className="text-sm text-gray-600">Type: {template.type}</div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={template.enabled}
                                                        onChange={(e) => handleTemplateChange(template.id, 'enabled', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>

                                                <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                                    <Edit size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {template.subject && (
                                            <div className="mb-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                                <input
                                                    type="text"
                                                    value={template.subject}
                                                    onChange={(e) => handleTemplateChange(template.id, 'subject', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                            <textarea
                                                value={template.content}
                                                onChange={(e) => handleTemplateChange(template.id, 'content', e.target.value)}
                                                rows="4"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                            />
                                        </div>

                                        <div className="mt-3 text-sm text-gray-500">
                                            Available variables: {template.type === 'email'
                                                ? '{student_name}, {course_name}, {date}, {instructor_name}'
                                                : '{student_name}, {course_name}, {check_in_time}'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Integration Settings */}
                    {activeTab === "integration" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Integration Settings</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-800">Sync with Calendar</div>
                                        <p className="text-sm text-gray-600">Sync attendance sessions with calendar apps</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.syncWithCalendar}
                                            onChange={(e) => handleSettingChange('syncWithCalendar', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-800">QR Code Check-in</div>
                                        <p className="text-sm text-gray-600">Enable QR code based attendance check-in</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.enableQRCodeCheckIn}
                                            onChange={(e) => handleSettingChange('enableQRCodeCheckIn', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-800">Biometric Check-in</div>
                                        <p className="text-sm text-gray-600">Enable fingerprint or face recognition check-in</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.enableBiometricCheckIn}
                                            onChange={(e) => handleSettingChange('enableBiometricCheckIn', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-800">Auto Attendance</div>
                                        <p className="text-sm text-gray-600">Automatically record attendance based on location</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.enableAutoAttendance}
                                            onChange={(e) => handleSettingChange('enableAutoAttendance', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Policy Settings */}
                    {activeTab === "policy" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Policy</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Max Absences Before Warning
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.maxAbsencesBeforeWarning}
                                        onChange={(e) => handleSettingChange('maxAbsencesBeforeWarning', parseInt(e.target.value))}
                                        className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                                        min="1"
                                        max="10"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Send warning after this many absences</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Max Absences Before Action
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.maxAbsencesBeforeAction}
                                        onChange={(e) => handleSettingChange('maxAbsencesBeforeAction', parseInt(e.target.value))}
                                        className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                                        min="1"
                                        max="20"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Take action after this many absences</p>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-800">Auto-generate Certificates</div>
                                        <p className="text-sm text-gray-600">Automatically generate certificates for eligible students</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.autoGenerateCertificates}
                                            onChange={(e) => handleSettingChange('autoGenerateCertificates', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {settings.autoGenerateCertificates && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Certificate Threshold (%)
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.certificateThreshold}
                                            onChange={(e) => handleSettingChange('certificateThreshold', parseInt(e.target.value))}
                                            className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                                            min="50"
                                            max="100"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Minimum attendance rate for certificate eligibility</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Shield size={20} className="text-blue-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-blue-800">Policy Guidelines</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            These settings help maintain academic integrity and ensure fair attendance policies.
                                            Make sure to communicate these policies clearly to students.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendanceSettingsPage;