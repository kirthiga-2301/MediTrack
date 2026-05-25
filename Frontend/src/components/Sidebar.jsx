import { useEffect, useState, useRef } from "react"
import { NavLink } from "react-router-dom"
import { fetchDoctors } from "../services/api"
import "./Sidebar.css"

function Sidebar() {
  const [doctors, setDoctors] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    async function loadDoctors() {
      try {
        const data = await fetchDoctors()
        setDoctors(data)
      } catch (err) {
        console.error("Failed to load doctors for sidebar")
      }
    }
    loadDoctors()
    
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="navbar-container">
      <div className="logo-section">
        <h1 className="logo">MediTrack</h1>
        <p className="portal-text">ADMIN PORTAL</p>
      </div>

      <div className="nav-links">
        <NavLink 
          to="/doctors" 
          end
          className={({ isActive }) => isActive ? "menu-item active-menu" : "menu-item"}
        >
          <span>✨</span>
          <span>All Doctors</span>
        </NavLink>

        <NavLink 
          to="/doctors/add" 
          className={({ isActive }) => isActive ? "menu-item active-menu" : "menu-item"}
        >
          <span>➕</span>
          <span>Add Doctor</span>
        </NavLink>

        <NavLink 
          to="/patients/add" 
          className={({ isActive }) => isActive ? "menu-item active-menu" : "menu-item"}
        >
          <span>➕</span>
          <span>Add Patient</span>
        </NavLink>

        <div className="specialization-dropdown" ref={dropdownRef}>
          <div 
            className="dropdown-trigger"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>SPECIALIZATION</span>
            <span style={{ fontSize: "10px", marginLeft: "4px" }}>{isExpanded ? "▲" : "▼"}</span>
          </div>

          {isExpanded && (
            <div className="doctors-dropdown-menu">
              {doctors.map(doc => (
                <NavLink 
                  key={doc.id}
                  to={`/doctors/${doc.id}`}
                  className={({ isActive }) => isActive ? "doc-item active-doc" : "doc-item"}
                  onClick={() => setIsExpanded(false)}
                >
                  <div className={`status-dot ${doc.available ? 'available' : 'unavailable'}`}></div>
                  <span className="doc-name">{doc.specialization}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar