import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DoctorList from './pages/DoctorList';
import DoctorDetail from './pages/DoctorDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Simple Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              <span className="font-extrabold text-xl tracking-tight text-gray-900">
                Medi<span className="text-indigo-600">Track</span>
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/doctors" replace />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MediTrack Hospital Management. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
