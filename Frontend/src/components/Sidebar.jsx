import { Link, useLocation } from "react-router-dom"

function Sidebar() {
  const location = useLocation()
  
  // Check if current path is doctors
  const isDoctorsPath = location.pathname.includes("/doctors")

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shrink-0 relative">
      {/* Logo Area */}
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white flex flex-col gap-1">
          <span className="text-blue-400">MediSync</span>
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Admin Portal
          </span>
        </h1>
      </div>

      {/* Nav Links */}
      <div className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/doctors"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
            isDoctorsPath
              ? "bg-indigo-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <span>✨</span>
          Doctors Dashboard
        </Link>
        
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 cursor-not-allowed opacity-50">
          <span>👥</span>
          Add Patient
        </div>
      </div>

      {/* Profile Area */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <div className="text-sm font-bold text-white">Admin User</div>
            <div className="text-xs text-green-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Online
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
