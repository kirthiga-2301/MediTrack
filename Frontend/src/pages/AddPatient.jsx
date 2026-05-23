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
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add Patient</h1>
        <p className="text-gray-500 mt-1">Register a new patient and assign to a doctor</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
          Register New Patient
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Fill in the details to add a new patient
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kumar"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 45"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                placeholder="e.g. A+"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Doctor
              </label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g. Heart Problem"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Patient"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPatient
