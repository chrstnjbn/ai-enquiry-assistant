# AI Enquiry Assistant

## 📌 Overview
This project is an AI-based enquiry assistant designed for educational institutions.  
It automates student enquiries by interacting with users, collecting their details, and storing them as leads for follow-up.

---

## 🚀 Features
- Chat-based enquiry handling
- Step-by-step data collection (course, name, phone)
- Lead storage in MongoDB
- Input validation (e.g., phone number)
- REST API-based workflow
- Retrieve all stored leads

---

## 🧠 Workflow

User → Chat API → Processing Logic → MongoDB → Lead Storage

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

---

## 📂 Project Structure

backend/
│── models/
│ └── Lead.js
│── server.js
│── package.json
│── .env.example


---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/chrstnjbn/ai-enquiry-assistant.git
cd ai-enquiry-assistant

2. Install dependencies
npm install
3. Create .env file
MONGO_URI=your_mongodb_connection_string
4. Run the server
node server.js

Server will run on:

http://localhost:5000
🔗 API Endpoints
▶️ Start Chat
POST /chat

Example:

{
  "message": "hi"
}
▶️ Save Lead
POST /lead
▶️ Get All Leads
GET /leads
🌍 Real-World Use Case

This system can be used by educational institutions to automate enquiry handling and lead generation.
It can be integrated with platforms like WhatsApp for real-time interaction.

🔮 Future Improvements
Integration with AI/NLP models for smarter responses
Frontend chat interface
WhatsApp API integration
Admin dashboard for lead management
👩‍💻 Author

Christina Jibin


---

# 🚀 What to do now

1. Create `README.md` in your repo  
2. Paste this content  
3. Save  
4. Push:

```bash
git add README.md
git commit -m "Added README"
git push
