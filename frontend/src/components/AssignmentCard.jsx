const AssignmentCard = ({ assignment, onEdit, onDelete }) => {
    // Risk level color mapping
    const getRiskColor = (level) => {
        switch (level) {
            case 'High':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Priority color mapping
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Urgent':
                return 'bg-red-500 text-white';
            case 'Important':
                return 'bg-orange-500 text-white';
            case 'Normal':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-800 flex-1 pr-2">
                    {assignment.name}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(assignment)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(assignment._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Due Date & Days Left */}
            <div className="space-y-2 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">📅 Due:</span>
                    <span>{formatDate(assignment.dueDate)}</span>
                </div>
                <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">⏰</span>
                    <span className={`font-semibold ${assignment.daysLeft <= 1 ? 'text-red-600' : 'text-gray-700'}`}>
                        {assignment.daysLeft === 0
                            ? 'Due Today!'
                            : assignment.daysLeft === 1
                                ? '1 day left'
                                : `${assignment.daysLeft} days left`}
                    </span>
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(assignment.riskLevel)}`}>
                    {assignment.riskLevel} Risk
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(assignment.priority)}`}>
                    {assignment.priority}
                </span>
            </div>

            {/* Reminders */}
            {assignment.reminders && assignment.reminders.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-1">Reminders:</p>
                    <div className="flex flex-wrap gap-1">
                        {assignment.reminders.map((reminder, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                                🔔 {reminder}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentCard;
