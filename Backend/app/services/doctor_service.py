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


async def create_doctor(doctor_data):

    last_doctor = await doctor_collection.find_one(
        sort=[("id", -1)]
    )
    new_id = (last_doctor["id"] + 1) if last_doctor else 1

    doctor_data["id"] = new_id

    await doctor_collection.insert_one(doctor_data)

    doctor_data["_id"] = str(doctor_data["_id"])

    return doctor_data


async def create_patient(patient_data):

    last_patient = await patient_collection.find_one(
        sort=[("id", -1)]
    )
    new_id = (last_patient["id"] + 1) if last_patient else 1

    patient_data["id"] = new_id

    await patient_collection.insert_one(patient_data)

    patient_data["_id"] = str(patient_data["_id"])

    return patient_data