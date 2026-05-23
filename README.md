#  MediTrack

Welcome to **MediTrack**! A comprehensive full-stack application designed to seamlessly manage doctors and patients.

##  Tech Stack

### Frontend
- **Framework:** React with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### Backend
- **Framework:** FastAPI
- **Database:** MongoDB (via Motor AsyncIO)
- **Data Validation:** Pydantic

---

##  Features

- **Doctor Management:** View a list of doctors, see detailed profiles, and add new doctors to the system.
- **Patient Management:** View all patients and manage patients assigned to specific doctors.
- **Modern UI:** Built with Tailwind CSS for a fully responsive and clean interface.
- **Fast Backend:** Powered by FastAPI for quick and asynchronous API responses.

---

##  Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Python 3.8+](https://www.python.org/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/kirthiga-2301/MediTrack.git
cd "Full Stack"
```

### 2. Backend Setup
From the root directory, activate your virtual environment and start the server:

```bash
# Create a virtual environment (if not already created)
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install the required dependencies
pip install -r requirements.txt

# Ensure you have a .env file at the root with your MongoDB credentials:
# MONGO_URL=your_mongodb_uri
# DATABASE_NAME=your_database_name

# Navigate to the Backend directory and start the FastAPI server
cd Backend
uvicorn app.main:app --reload
```
The backend will run on `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal, navigate to the `Frontend` directory, and start the development server:

```bash
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
├── Backend/                 # FastAPI server and routes
│   ├── app/
│   │   ├── main.py          # Entry point for FastAPI
│   │   ├── routes/          # API endpoints (doctors, patients)
│   │   └── services/        # Business logic and database operations
├── Frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page layouts (DoctorList, DoctorDetail)
│   │   └── App.jsx          # Main application routing
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables (MongoDB config)
└── remove_duplicates.py     # Utility script for database cleanup
```

---

##  Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

##  License
This project is open-source and available under the [MIT License](LICENSE).
