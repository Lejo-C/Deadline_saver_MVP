import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddAssignment from './pages/AddAssignment';
import NotificationSetup from './components/NotificationSetup';

function App() {
  return (
    <Router>
      <NotificationSetup />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddAssignment />} />
      </Routes>
    </Router>
  );
}

export default App;
