import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAssignment } from '../api/assignments';
import Toast from '../components/Toast';

const AddAssignment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dueDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createAssignment(formData);
            setToast({ message: 'Assignment created successfully!', type: 'success' });

            // Redirect to dashboard after 1 second
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            setToast({
                message: error.response?.data?.error || 'Failed to create assignment',
                type: 'error'
            });
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        ➕ Add Assignment
                    </h1>
                    <p className="text-gray-600">Track your deadline and stay organized</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Assignment Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Assignment Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Math Homework, Final Project..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 transition"
                            >
                                {loading ? 'Creating...' : 'Create Assignment'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        ℹ️ Your assignment will be automatically analyzed for risk level, priority, and reminders based on the due date.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddAssignment;
