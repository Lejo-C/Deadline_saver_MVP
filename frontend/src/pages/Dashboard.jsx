import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignments, updateAssignment, deleteAssignment } from '../api/assignments';
import AssignmentCard from '../components/AssignmentCard';
import EditModal from '../components/EditModal';
import Toast from '../components/Toast';

const Dashboard = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [toast, setToast] = useState(null);

    // Fetch assignments on mount
    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const data = await getAssignments();
            if (Array.isArray(data)) {
                setAssignments(data);
            } else {
                console.error("Assignments data is not an array:", data);
                setAssignments([]);
            }
        } catch (error) {
            setToast({
                message: 'Failed to load assignments',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (assignment) => {
        setEditingAssignment(assignment);
    };

    const handleSave = async (data) => {
        try {
            await updateAssignment(editingAssignment._id, data);
            setToast({ message: 'Assignment updated successfully!', type: 'success' });
            await fetchAssignments(); // Re-fetch to get updated data
        } catch (error) {
            setToast({
                message: 'Failed to update assignment',
                type: 'error'
            });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this assignment?')) {
            return;
        }

        try {
            await deleteAssignment(id);
            setAssignments(assignments.filter((a) => a._id !== id));
            setToast({ message: 'Assignment deleted successfully!', type: 'success' });
        } catch (error) {
            setToast({
                message: 'Failed to delete assignment',
                type: 'error'
            });
        }
    };

    // Calculate stats
    const totalAssignments = assignments.length;
    const urgentAssignments = assignments.filter(a => a.priority === 'Urgent').length;
    const dueSoon = assignments.filter(a => a.daysLeft <= 3 && a.daysLeft >= 0).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {editingAssignment && (
                <EditModal
                    assignment={editingAssignment}
                    onClose={() => setEditingAssignment(null)}
                    onSave={handleSave}
                />
            )}

            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-1">
                                📚 Assignment Tracker
                            </h1>
                            <p className="text-gray-600">Manage your deadlines efficiently</p>
                        </div>
                        <button
                            onClick={() => navigate('/add')}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition"
                        >
                            ➕ Add Assignment
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                        <p className="text-sm text-gray-600 font-medium">Total Assignments</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{totalAssignments}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                        <p className="text-sm text-gray-600 font-medium">Urgent</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{urgentAssignments}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-600 font-medium">Due Soon (≤3 days)</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{dueSoon}</p>
                    </div>
                </div>

                {/* Assignments List */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : assignments.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No assignments yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Start by adding your first assignment to track deadlines
                        </p>
                        <button
                            onClick={() => navigate('/add')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                        >
                            ➕ Add Your First Assignment
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {assignments.map((assignment) => (
                            <AssignmentCard
                                key={assignment._id}
                                assignment={assignment}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
