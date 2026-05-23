import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchDoctors = async () => {
  const response = await axios.get(`${API_URL}/doctors`);
  return response.data;
};

export const fetchDoctorById = async (id) => {
  const response = await axios.get(`${API_URL}/doctors/${id}`);
  return response.data;
};

export const fetchDoctorPatients = async (id) => {
  const response = await axios.get(`${API_URL}/doctors/${id}/patients`);
  return response.data;
};

export const fetchAllPatients = async () => {
  const response = await axios.get(`${API_URL}/patients`);
  return response.data;
};

export const addDoctor = async (doctorData) => {
  const response = await axios.post(`${API_URL}/doctors`, doctorData);
  return response.data;
};

export const addPatient = async (patientData) => {
  const response = await axios.post(`${API_URL}/patients`, patientData);
  return response.data;
};
