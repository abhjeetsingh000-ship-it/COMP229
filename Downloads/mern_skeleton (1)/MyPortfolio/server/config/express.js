import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Contact Form Submission Route
app.post("/api/contacts", async (req, res) => {
  try {
    const contactSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      contactNumber: String,
      email: String,
      message: String,
      created: { type: Date, default: Date.now },
    });

    const Contact =
      mongoose.models.Contact || mongoose.model("Contact", contactSchema);

    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;