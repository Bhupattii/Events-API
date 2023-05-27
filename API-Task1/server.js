const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer"); // for image upload
const path = require("path");
const Product = require("./models/productModel.js");

const app = express();

app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: false }));

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: "./uploads", // Specify the directory to store uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Define the filename for the uploaded file
  },
});
const upload = multer({ storage });

// to get the product from the database
app.get("/api/v3/app/events", async (req, res) => {
  try {
    const { type, limit, page } = req.query;
    if (type === "latest") {
      const events = await Product.find({})
        .sort({ _id: -1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
      res.status(200).json(events);
    } else {
      res.status(400).json({ message: "Invalid type parameter" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// to get data by ID
app.get("/api/v3/app/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Product.findById(id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// to post data to the database
app.post("/api/v3/app/events", upload.single("photo"), async (req, res) => {
  try {
    const eventData = req.body;

    // Check if a file was uploaded
    if (req.file) {
      const photoPath = req.file.path; // Assuming Multer saves the file to the 'uploads' directory
      eventData.photo = photoPath; // Add the file path to the eventData

      const event = await Product.create(eventData);
      res.status(200).json({ event, photoPath });
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// to update the database
app.put("/api/v3/app/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Product.findByIdAndUpdate(id, req.body);

    // if we cannot find any event in the database
    if (!event) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    }
    const updateEvent = await Product.findById(id);
    res.status(200).json(updateEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// to delete the event
app.delete("/api/v3/app/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Product.findByIdAndDelete(id, req.body);
    if (!event) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://bhupattii:bhupattii@cluster0.mufl1h7.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
