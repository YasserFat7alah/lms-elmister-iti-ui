import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateNavigator = ({ onPrev, onNext, label, onNextDisabled = false }) => {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onPrev}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Previous week"
            >
                <ChevronLeft size={16} />
            </button>

            <span className="text-xs font-semibold text-gray-600 min-w-[120px] text-center">
                {label}
            </span>

            <button
                onClick={onNext}
                disabled={onNextDisabled}
                className={`p-1 rounded-full text-gray-500 transition-colors ${onNextDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700'}`}
                aria-label="Next week"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default DateNavigator;
