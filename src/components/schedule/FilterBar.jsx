'use client';

export default function FilterBar({ currentFilter, onFilterChange }) {
    const filters = [
        { id: 'all', label: 'All', icon: '📋' },
        { id: 'today', label: 'Today', icon: '📅' },
        { id: 'upcoming', label: 'Upcoming', icon: '⏰' },
        { id: 'completed', label: 'Completed', icon: '✅' },
        { id: 'cancelled', label: 'Cancelled', icon: '❌' }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition ${currentFilter === filter.id
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <span className="mr-2">{filter.icon}</span>
                        <span>{filter.label}</span>
                    </button>
                ))}
            </div>

            {/* Additional Filters */}
            <div className="mt-4 flex flex-wrap gap-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">All Subjects</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="arabic">Arabic</option>
                </select>

                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">All Grades</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                </select>

                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">All Teachers</option>
                    <option value="teacher1">Ahmed Mohamed</option>
                    <option value="teacher2">Sara Ali</option>
                </select>
            </div>

            {/* Search */}
            <div className="mt-4">
                <div className="relative">
                    <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
                    <input
                        type="text"
                        placeholder="Search for a class..."
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
        </div>
    );
}