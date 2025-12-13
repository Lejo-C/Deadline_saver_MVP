import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddAssignment from './pages/AddAssignment';
import NotificationSetup from './components/NotificationSetup';

function App() {
  return (
    <Router>
      <NotificationSetup publicKey="BOvvEvH2J5spAqGVr16DOmEemEhYZHLkEhx8UkswtSISBt4vKrfzrD-xv0ZI_sTeKBUTT6ito0ovdc2I_k4wj6s" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddAssignment />} />
      </Routes>
    </Router>
  );
}

export default App;
