from app.database import doctor_collection, patient_collection


async def get_all_doctors():

    doctors = []

    async for doctor in doctor_collection.find():

        doctor["_id"] = str(doctor["_id"])
        
        patient_count = await patient_collection.count_documents({"doctor_id": doctor["id"]})
        doctor["patient_count"] = patient_count

        doctors.append(doctor)

    return doctors


async def get_doctor_by_id(doctor_id):

    doctor = await doctor_collection.find_one(
        {"id": doctor_id}
    )

    if doctor:

        doctor["_id"] = str(doctor["_id"])

    return doctor


async def get_all_patients():

    patients = []

    async for patient in patient_collection.find():

        patient["_id"] = str(patient["_id"])

        patients.append(patient)

    return patients


async def get_patients_by_doctor(doctor_id):

    patients = []

    async for patient in patient_collection.find(
        {"doctor_id": doctor_id}
    ):

        patient["_id"] = str(patient["_id"])

        patients.append(patient)

    return patients