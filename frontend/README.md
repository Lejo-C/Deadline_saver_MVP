# 🎓 Assignment Deadline Tracker - Frontend

A clean, minimal, mobile-first React application for tracking student assignment deadlines.

## 🏗️ Architecture

### Folder Structure
```
src/
├── api/
│   └── assignments.js          # Axios API calls
├── components/
│   ├── AssignmentCard.jsx      # Card component for displaying assignments
│   ├── EditModal.jsx           # Modal for editing assignments
│   └── Toast.jsx               # Toast notification component
├── pages/
│   ├── Dashboard.jsx           # Main dashboard with assignment list
│   └── AddAssignment.jsx       # Add new assignment page
├── App.jsx                     # Main app with routing
└── index.css                   # Global styles + Tailwind
```

## 🚀 Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS 4** - Utility-first CSS
- **Vite** - Build tool

## 📡 API Integration

### Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/assignments/analyze` | Create new assignment |
| GET | `/api/assignments/` | Fetch all assignments |
| PUT | `/api/assignments/:id` | Update assignment |
| DELETE | `/api/assignments/:id` | Delete assignment |

### API Helper (`src/api/assignments.js`)
```javascript
import { createAssignment, getAssignments, updateAssignment, deleteAssignment } from './api/assignments';
```

## 🎨 Features

### Dashboard Page (`/`)
- ✅ Display all assignments in a card grid
- ✅ Show stats: Total, Urgent, Due Soon
- ✅ Color-coded risk levels (Red/Yellow/Green)
- ✅ Priority badges (Urgent/Important/Normal)
- ✅ Edit and delete actions
- ✅ Empty state with CTA
- ✅ Loading spinner
- ✅ Mobile-responsive grid

### Add Assignment Page (`/add`)
- ✅ Simple form with name + due date
- ✅ Form validation
- ✅ Success toast notification
- ✅ Auto-redirect to dashboard
- ✅ Info box explaining auto-calculation
- ✅ Cancel button

### Edit Modal
- ✅ Pre-filled form with current values
- ✅ Update name and/or due date
- ✅ Backend recalculates logic automatically
- ✅ Overlay with backdrop
- ✅ Save/Cancel buttons

### Toast Notifications
- ✅ Success (green) and Error (red) types
- ✅ Auto-dismiss after 3 seconds
- ✅ Manual close button
- ✅ Slide-in animation

## 🎯 UI/UX Highlights

### Mobile-First Design
- Responsive grid: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- Touch-friendly buttons and inputs
- Optimized spacing for small screens

### Color System
- **Low Risk**: Green (`bg-green-100`, `text-green-800`)
- **Medium Risk**: Yellow (`bg-yellow-100`, `text-yellow-800`)
- **High Risk**: Red (`bg-red-100`, `text-red-800`)
- **Urgent Priority**: Red (`bg-red-500`)
- **Important Priority**: Orange (`bg-orange-500`)
- **Normal Priority**: Blue (`bg-blue-500`)

### Visual Polish
- Rounded corners (`rounded-lg`)
- Soft shadows (`shadow-md`, `shadow-lg`)
- Smooth transitions on hover
- Gradient background (`from-blue-50 to-indigo-100`)
- Clean typography

## 🔧 Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 🧪 Usage Examples

### Creating an Assignment
1. Click "➕ Add Assignment" button
2. Enter assignment name (e.g., "Math Final Project")
3. Select due date
4. Click "Create Assignment"
5. Backend auto-calculates: risk level, priority, days left, reminders
6. Redirects to dashboard with success toast

### Editing an Assignment
1. Click "Edit" on any assignment card
2. Modal opens with pre-filled data
3. Modify name or due date
4. Click "Save Changes"
5. Backend recalculates if due date changed
6. Dashboard refreshes with updated data

### Deleting an Assignment
1. Click "Delete" on assignment card
2. Confirm deletion in browser dialog
3. Assignment removed from list
4. Success toast appears

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🎨 Component Details

### AssignmentCard
**Props:**
- `assignment` - Assignment object from API
- `onEdit` - Function to open edit modal
- `onDelete` - Function to delete assignment

**Features:**
- Displays: name, due date, days left, risk level, priority, reminders
- Color-coded badges based on risk/priority
- Responsive layout

### EditModal
**Props:**
- `assignment` - Assignment to edit
- `onClose` - Function to close modal
- `onSave` - Function to save changes

**Features:**
- Backdrop overlay
- Pre-filled form
- Loading state during save

### Toast
**Props:**
- `message` - Toast message text
- `type` - 'success' or 'error'
- `onClose` - Function to dismiss toast

**Features:**
- Auto-dismiss after 3 seconds
- Slide-in animation
- Manual close button

## 🔌 Backend Requirements

Your backend should be running on `http://localhost:5000` with the following routes:

```javascript
POST   /api/assignments/analyze  // Create
GET    /api/assignments/         // Read all
PUT    /api/assignments/:id      // Update
DELETE /api/assignments/:id      // Delete
```

## 📊 Data Model

```javascript
{
  _id: string,
  name: string,
  dueDate: Date,
  daysLeft: number,
  riskLevel: 'Low' | 'Medium' | 'High',
  priority: 'Normal' | 'Important' | 'Urgent',
  reminders: string[],
  status: 'Pending' | 'Completed' | 'Past Due'
}
```

## 🐛 Error Handling

- ✅ Try-catch blocks on all API calls
- ✅ User-friendly error messages via toast
- ✅ Loading states during async operations
- ✅ Form validation before submission
- ✅ Confirmation dialogs for destructive actions

## 🚦 Loading States

- Dashboard: Spinning loader while fetching
- Forms: Disabled buttons with "Loading..." text
- No skeleton screens (kept minimal)

## ✅ Code Quality

- **Functional Components**: 100%
- **Hooks**: useState, useEffect
- **No Class Components**: ✅
- **No Redux/Zustand**: ✅
- **Clean State Management**: ✅
- **Readable Code**: ✅
- **Minimal Abstractions**: ✅

## 🎯 Future Enhancements (Optional)

- Add filter/sort functionality
- Add assignment completion toggle
- Add search feature
- Add date range filter
- Add export to CSV
- Add dark mode

## 📝 Notes

- Backend must be running on port 5000
- Ensure CORS is enabled on backend
- All dates are in local timezone
- Form validates minimum date as today

---

**Built with ❤️ using React + Tailwind CSS**
