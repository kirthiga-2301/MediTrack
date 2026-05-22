import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDoctorById, fetchDoctorPatients } from '../services/api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [doctorData, patientsData] = await Promise.all([
          fetchDoctorById(id),
          fetchDoctorPatients(id)
        ]);
        
        setDoctor(doctorData);
        setPatients(patientsData);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  if (loading) return <div className="mt-20"><Spinner /></div>;
  if (error) return <div className="max-w-4xl mx-auto mt-10 px-4"><ErrorMessage message={error} /></div>;
  if (!doctor) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/doctors" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-8 transition-colors">
        <span className="mr-2">←</span> Back to all doctors
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
        <div className={`h-4 w-full ${doctor.available ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
        <div className="p-8 md:flex items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{doctor.name}</h1>
            <p className="text-xl text-indigo-600 font-medium mb-4">{doctor.specialization}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <span className="mr-2">📅</span> {doctor.experience} Years Experience
              </span>
              <span className={`flex items-center px-3 py-1.5 rounded-lg border font-medium ${
                doctor.available ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}>
                <span className="mr-2">{doctor.available ? '🟢' : '⚫'}</span> 
                {doctor.available ? 'Available for Appointments' : 'Currently Unavailable'}
              </span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="inline-block bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
              <div className="text-3xl font-bold text-indigo-700 mb-1">{patients.length}</div>
              <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">Assigned Patients</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">📋</span> Assigned Patients
        </h2>
        
        {patients.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Condition</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{patient.age}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-red-50 text-red-700 border border-red-100">
                          {patient.blood_group}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{patient.condition}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center">
            <p className="text-gray-500">This doctor currently has no assigned patients.</p>
          </div>
        )}
      </div>
    </div>
  );
}
