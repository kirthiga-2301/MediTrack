import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

async def clean_duplicates():
    client = AsyncIOMotorClient(MONGO_URL)
    database = client[DATABASE_NAME]
    doctor_collection = database["doctors"]

    cursor = doctor_collection.find({"name": "Dr. Meena"})
    meena_docs = await cursor.to_list(length=100)
    
    if len(meena_docs) > 1:
        # Keep the first one, delete the rest
        docs_to_delete = [doc["_id"] for doc in meena_docs[1:]]
        result = await doctor_collection.delete_many({"_id": {"$in": docs_to_delete}})
        print(f"Deleted {result.deleted_count} duplicate 'Dr. Meena' records.")
    else:
        print("No duplicates found or only 1 exists.")

if __name__ == "__main__":
    asyncio.run(clean_duplicates())
