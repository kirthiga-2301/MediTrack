import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addPatient, fetchDoctors } from "../services/api"

function AddPatient() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [condition, setCondition] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadDoctors() {
      try {
        const data = await fetchDoctors()
        setDoctors(data)
      } catch (err) {
        setError("Failed to load doctors")
      }
    }
    loadDoctors()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await addPatient({
        name,
        age: parseInt(age),
        blood_group: bloodGroup,
        condition,
        doctor_id: parseInt(doctorId)
      })
      navigate(`/doctors/${doctorId}`)
    } catch (err) {
      setError("Failed to add patient")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Add Patient</h1>
        <p className="page-subtitle">Register a new patient and assign to a doctor</p>
      </div>

      <div className="form-card">
        <h2 className="form-title">
          Register New Patient
        </h2>
        <p className="form-description">
          Fill in the details to add a new patient
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
                Patient Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kumar"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 45"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Blood Group
              </label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                placeholder="e.g. A+"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Assign Doctor
              </label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} - {doc.specialization}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Condition
            </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g. Heart Problem"
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading ? "Adding..." : "Add Patient"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPatient
