/**
 * Smart date formatter for chat timestamps
 * Returns "Today", "Yesterday", day names for current week, or date for older messages
 */
export const formatChatDate = (date) => {
    if (!date) return '';

    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset times to midnight for accurate day comparison
    const messageDateMidnight = new Date(messageDate.setHours(0, 0, 0, 0));
    const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
    const yesterdayMidnight = new Date(yesterday.setHours(0, 0, 0, 0));

    // Check if today
    if (messageDateMidnight.getTime() === todayMidnight.getTime()) {
        return 'Today';
    }

    // Check if yesterday
    if (messageDateMidnight.getTime() === yesterdayMidnight.getTime()) {
        return 'Yesterday';
    }

    // Check if within current week (last 7 days from today)
    const weekAgo = new Date(todayMidnight);
    weekAgo.setDate(weekAgo.getDate() - 7);

    if (messageDateMidnight > weekAgo) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[new Date(date).getDay()];
    }

    // For older messages, show date
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
};

/**
 * Format time only (HH:MM)
 */
export const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Get day separator label for chat message groups
 */
export const getDaySeparatorLabel = (date) => {
    if (!date) return '';

    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDateMidnight = new Date(messageDate.setHours(0, 0, 0, 0));
    const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
    const yesterdayMidnight = new Date(yesterday.setHours(0, 0, 0, 0));

    if (messageDateMidnight.getTime() === todayMidnight.getTime()) {
        return 'Today';
    }

    if (messageDateMidnight.getTime() === yesterdayMidnight.getTime()) {
        return 'Yesterday';
    }

    const weekAgo = new Date(todayMidnight);
    weekAgo.setDate(weekAgo.getDate() - 7);

    if (messageDateMidnight > weekAgo) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date(date).getDay()];
    }

    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
};

/**
 * Check if two dates are on different days
 */
export const isDifferentDay = (date1, date2) => {
    if (!date1 || !date2) return true;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return d1.getDate() !== d2.getDate() ||
        d1.getMonth() !== d2.getMonth() ||
        d1.getFullYear() !== d2.getFullYear();
};
