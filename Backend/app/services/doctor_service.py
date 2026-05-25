from app.database import doctor_collection, patient_collection
from app.data.doctors import doctors as mock_doctors
from app.data.patients import patients as mock_patients

# Temporary mock data store
_doctors = list(mock_doctors)
_patients = list(mock_patients)


async def get_all_doctors():
    doctors = []
    for doctor in _doctors:
        # Create a copy so we don't modify the original
        doc_copy = dict(doctor)
        doc_copy["_id"] = str(doc_copy["id"])
        
        patient_count = len([p for p in _patients if p["doctor_id"] == doc_copy["id"]])
        doc_copy["patient_count"] = patient_count
        doctors.append(doc_copy)
    return doctors


async def get_doctor_by_id(doctor_id):
    doctor = next((d for d in _doctors if d["id"] == doctor_id), None)
    if doctor:
        doc_copy = dict(doctor)
        doc_copy["_id"] = str(doc_copy["id"])
        return doc_copy
    return None


async def get_all_patients():
    patients = []
    for patient in _patients:
        pat_copy = dict(patient)
        pat_copy["_id"] = str(pat_copy["id"])
        patients.append(pat_copy)
    return patients


async def get_patients_by_doctor(doctor_id):
    patients = []
    for patient in _patients:
        if patient["doctor_id"] == doctor_id:
            pat_copy = dict(patient)
            pat_copy["_id"] = str(pat_copy["id"])
            patients.append(pat_copy)
    return patients


async def create_doctor(doctor_data):
    new_id = max([d["id"] for d in _doctors], default=0) + 1
    doctor_data["id"] = new_id
    _doctors.append(doctor_data)
    doctor_data["_id"] = str(new_id)
    return doctor_data


async def create_patient(patient_data):
    new_id = max([p["id"] for p in _patients], default=0) + 1
    patient_data["id"] = new_id
    _patients.append(patient_data)
    patient_data["_id"] = str(new_id)
    return patient_data