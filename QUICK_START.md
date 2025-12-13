# 🚀 Quick Reference Guide

## ✨ What Was Built

A **clean, minimal, mobile-first** React application following senior engineer best practices.

## 📁 File Structure

```
frontend/src/
├── api/
│   └── assignments.js          ← Axios API helper (all endpoints)
├── components/
│   ├── AssignmentCard.jsx      ← Card with color-coded badges
│   ├── EditModal.jsx           ← Modal for editing
│   └── Toast.jsx               ← Simple notification component
├── pages/
│   ├── Dashboard.jsx           ← Main page (/, shows all assignments)
│   └── AddAssignment.jsx       ← Add page (/add, form)
├── App.jsx                     ← Router setup (2 routes)
└── index.css                   ← Global styles + Tailwind
```

**Total Files:** 8  
**Lines of Code:** ~600  
**External Libraries:** axios, react-router-dom (+ React, Tailwind already installed)

---

## 🎯 Key Features

### ✅ Dashboard (`/`)
- Fetch all assignments on mount
- Display in responsive grid (1/2/3 columns)
- Show stats: Total, Urgent, Due Soon
- Edit button → opens modal
- Delete button → confirmation + API call
- Empty state with CTA
- Loading spinner

### ✅ Add Assignment (`/add`)
- Simple form (name + date)
- Validation
- POST to API
- Toast notification
- Auto-redirect to dashboard

### ✅ Edit Modal
- Pre-filled form
- Update via PUT
- Re-fetch after save
- Overlay with backdrop

### ✅ Toast Notifications
- Auto-dismiss (3s)
- Manual close
- Success/Error types

---

## 🎨 Design System

### Colors (Tailwind)
| Element | Color Class |
|---------|-------------|
| Low Risk | `bg-green-100 text-green-800 border-green-200` |
| Medium Risk | `bg-yellow-100 text-yellow-800 border-yellow-200` |
| High Risk | `bg-red-100 text-red-800 border-red-200` |
| Urgent Priority | `bg-red-500 text-white` |
| Important Priority | `bg-orange-500 text-white` |
| Normal Priority | `bg-blue-500 text-white` |

### Layout
- **Mobile**: 1 column (< 640px)
- **Tablet**: 2 columns (640px - 1024px)
- **Desktop**: 3 columns (> 1024px)

---

## 📡 API Calls

All API calls use **Axios** with async/await:

```javascript
// src/api/assignments.js
import { createAssignment, getAssignments, updateAssignment, deleteAssignment } from '../api/assignments';

// Usage in components:
const data = await createAssignment({ name: '...', dueDate: '...' });
const assignments = await getAssignments();
await updateAssignment(id, { name: '...', dueDate: '...' });
await deleteAssignment(id);
```

---

## 🧩 Component Props

### AssignmentCard
```javascript
<AssignmentCard
  assignment={assignment}  // Object from API
  onEdit={handleEdit}      // Function(assignment)
  onDelete={handleDelete}  // Function(id)
/>
```

### EditModal
```javascript
<EditModal
  assignment={assignment}  // Object to edit
  onClose={handleClose}    // Function()
  onSave={handleSave}      // Function({ name, dueDate })
/>
```

### Toast
```javascript
<Toast
  message="Success!"       // String
  type="success"           // 'success' | 'error'
  onClose={handleClose}    // Function()
/>
```

---

## 🔧 How to Run

### 1. Ensure Backend is Running
```bash
cd backend
npm start
# Should be on http://localhost:5000
```

### 2. Start Frontend
```bash
cd frontend
npm install  # (already done)
npm run dev
# Opens on http://localhost:5173
```

### 3. Test the App
1. Go to http://localhost:5173
2. Click "➕ Add Assignment"
3. Fill form and submit
4. See assignment in dashboard
5. Try Edit and Delete buttons

---

## 🎓 Code Patterns Used

### State Management
```javascript
const [assignments, setAssignments] = useState([]);
const [loading, setLoading] = useState(true);
const [toast, setToast] = useState(null);
```

### API Calls with Error Handling
```javascript
try {
  setLoading(true);
  const data = await getAssignments();
  setAssignments(data);
} catch (error) {
  setToast({ message: 'Failed to load', type: 'error' });
} finally {
  setLoading(false);
}
```

### Routing
```javascript
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

// Navigate programmatically:
navigate('/');
navigate('/add');
```

---

## 🎨 Styling Approach

- **Tailwind utility classes** for everything
- **No custom CSS files** (except global animations in index.css)
- **Mobile-first** responsive design
- **Clean, minimal** aesthetic

### Example Button
```jsx
<button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
  Click Me
</button>
```

---

## 🐛 Error Handling Strategy

1. **Try-catch** on all async operations
2. **Toast notifications** for user feedback
3. **Loading states** for all async actions
4. **Form validation** before submission
5. **Confirmation dialogs** for destructive actions

---

## 🚦 Loading States

```javascript
{loading ? (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
) : (
  // Content
)}
```

---

## 📊 Data Flow

### Create Assignment
```
AddAssignment Page
  ↓ (form submit)
POST /api/assignments/analyze
  ↓ (success)
Toast: "Assignment created!"
  ↓ (after 1s)
navigate('/') → Dashboard
```

### Edit Assignment
```
Dashboard
  ↓ (click Edit)
EditModal opens
  ↓ (submit)
PUT /api/assignments/:id
  ↓ (success)
fetchAssignments() → re-fetch all
  ↓
Dashboard re-renders with updated data
```

---

## 📝 Best Practices Followed

✅ **Functional components only**  
✅ **React hooks** (useState, useEffect)  
✅ **Axios** for API calls  
✅ **Clean Tailwind classes**  
✅ **No abstractions**  
✅ **No over-engineering**  
✅ **Small, readable components**  
✅ **Clear state management**  
✅ **Async/await**  
✅ **Error states**  
✅ **Loading states**  
✅ **Toast notifications**  
✅ **Mobile-first responsive**  

---

## 🎯 What's Different from Previous Version?

| Aspect | Previous (Complex) | Now (Minimal) |
|--------|-------------------|---------------|
| Styling | Custom CSS files | Tailwind only |
| HTTP Client | Fetch API | Axios |
| Structure | Manager pattern | Pages + Components |
| Routing | None | React Router |
| Edit UI | Inline form | Modal |
| Complexity | High | Low |
| Files | 13+ | 8 |
| Lines | 1500+ | ~600 |

---

## 🎉 Summary

You now have a **production-ready, minimal MVP** that:
- ✅ Integrates all backend API routes
- ✅ Follows senior engineer best practices
- ✅ Is mobile-first and responsive
- ✅ Has clean, readable code
- ✅ Uses Axios + Tailwind
- ✅ Has proper error handling
- ✅ Feels polished and professional

**Just run `npm run dev` and start tracking deadlines! 🚀**
