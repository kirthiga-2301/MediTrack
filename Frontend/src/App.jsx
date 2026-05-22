import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DoctorList from './pages/DoctorList';
import DoctorDetail from './pages/DoctorDetail';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-slate-50 flex overflow-hidden font-sans">
        
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden flex flex-col relative">
          <Routes>
            <Route path="/" element={<Navigate to="/doctors" replace />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
          </Routes>
          
          {/* Simple Footer inside main area */}
          <footer className="mt-auto border-t border-gray-200/60 py-6 text-center text-gray-400 text-sm bg-slate-50/50">
            &copy; {new Date().getFullYear()} MediSync Hospital Management.
          </footer>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
