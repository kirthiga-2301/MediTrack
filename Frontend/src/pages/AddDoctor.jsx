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
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add Doctor</h1>
        <p className="text-gray-500 mt-1">Register a new doctor to the hospital</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
          Register New Doctor
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Fill in the details to add a new doctor
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
                Doctor Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Kirthiga"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g. Cardiologist"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 10"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value === "true")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor
