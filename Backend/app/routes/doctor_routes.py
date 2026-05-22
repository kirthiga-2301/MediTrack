from fastapi import APIRouter

from app.services.doctor_service import (
    get_all_doctors,
    get_doctor_by_id,
    get_all_patients,
    get_patients_by_doctor
)

from app.data.doctors import doctors
from app.data.patients import patients

from app.database import (
    doctor_collection,
    patient_collection
)

router = APIRouter()


@router.get("/doctors", tags=["Doctors"])
async def fetch_doctors():

    return await get_all_doctors()


@router.get("/doctors/{doctor_id}", tags=["Doctors"])
async def fetch_single_doctor(doctor_id: int):

    doctor = await get_doctor_by_id(doctor_id)

    if doctor:
        return doctor

    return {
        "message": "Doctor not found"
    }


@router.get("/patients", tags=["Patients"])
async def fetch_patients():

    return await get_all_patients()


@router.get("/doctors/{doctor_id}/patients", tags=["Patients"])
async def fetch_doctor_patients(doctor_id: int):

    return await get_patients_by_doctor(doctor_id)


@router.post("/seed-data")
async def seed_data():

    await doctor_collection.delete_many({})
    await patient_collection.delete_many({})

    await doctor_collection.insert_many(doctors)

    await patient_collection.insert_many(patients)

    return {
        "message": "Data inserted successfully"
    }