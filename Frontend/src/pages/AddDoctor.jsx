import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addDoctor } from "../services/api"

function AddDoctor() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState("")
  const [available, setAvailable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await addDoctor({
        name,
        specialization,
        experience: parseInt(experience),
        available
      })
      navigate("/doctors")
    } catch (err) {
      setError("Failed to add doctor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Add Doctor</h1>
        <p className="page-subtitle">Register a new doctor to the hospital</p>
      </div>

      <div className="form-card">
        <h2 className="form-title">
          Register New Doctor
        </h2>
        <p className="form-description">
          Fill in the details to add a new doctor
        </p>

        {error && (
          <div className="alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Doctor Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Kirthiga"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g. Cardiologist"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Experience (Years)
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 10"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Availability
              </label>
              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value === "true")}
                className="form-input"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor
