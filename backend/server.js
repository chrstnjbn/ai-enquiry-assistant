const Lead = require("./models/Lead");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("ENV VALUE:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch(err => {
    console.log("❌ MongoDB connection failed");
    console.log("Lead object:", Lead);
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/lead", async (req, res) => {
    try {
        const { name, phone, course } = req.body;

        const newLead = new Lead({
            name,
            phone,
            course
        });

        await newLead.save();

        res.json({ message: "Lead saved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/chat", async (req, res) => {
    const { message, step, userData } = req.body || {};

    let response = "";
    let nextStep = step;
    let data = userData || {};

    // 🔥 Validation (important)
    if (!message) {
        return res.json({
            reply: "⚠️ Please enter a valid response",
            nextStep: step || "course"
        });
    }

    // 🔥 Logging (for demo & debugging)
    console.log("Step:", step);
    console.log("Message:", message);
    console.log("UserData:", data);

    if (!step) {
        response = "Hi! 👋 Welcome to our AI Enquiry Assistant.\nWhich course are you interested in? (BCA, B.Tech, MBA)";
        nextStep = "course";
    }

    else if (step === "course") {
        data.course = message;
        response = `Great choice! 🎓 ${message} is a popular course with strong career opportunities.\nCan I have your name?`;
        nextStep = "name";
    }

    else if (step === "name") {
        data.name = message;
        response = `Nice to meet you, ${message}! 😊\nPlease enter your phone number`;
        nextStep = "phone";
    }

    else if (step === "phone") {

        // 🔥 Phone validation
        if (!/^\d{10}$/.test(message)) {
            return res.json({
                reply: "⚠️ Please enter a valid 10-digit phone number",
                nextStep: "phone",
                userData: data
            });
        }

        data.phone = message;

        const newLead = new Lead(data);
        await newLead.save();

        response = "✅ Thank you! Our team will contact you soon with more details.";
        nextStep = "done";
    }

    else {
        response = "⚠️ Sorry, I didn’t understand that. Please select a valid option.";
        nextStep = "course";
    }

    res.json({
        reply: response,
        nextStep,
        userData: data
    });
});

// ✅ GET all leads (for demo)
app.get("/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(5000, () => { 
    console.log("Server started on port 5000"); 

});