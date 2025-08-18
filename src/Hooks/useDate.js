import React from 'react'

const useDate = () => {

    const DateForMat = (timestamp) => {
        const now = Date.now();
        const diffInMs = now - timestamp;

        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const month = 30 * day; // Approximate
        const year = 12 * month;

        if (diffInMs < minute) {
            return "Just now";
        } else if (diffInMs < hour) {
            const minutes = Math.floor(diffInMs / minute);
            return `${minutes}m`;
        } else if (diffInMs < day) {
            const hours = Math.floor(diffInMs / hour);
            return `${hours}h`;
        } else if (diffInMs < month) {
            const days = Math.floor(diffInMs / day);
            return `${days}d`;
        } else if (diffInMs < year) {
            const months = Math.floor(diffInMs / month);
            return `${months}mos`;
        } else {
            const years = Math.floor(diffInMs / year);
            return `${years}year`;
        }
    };

    return { DateForMat }
}

export default useDate