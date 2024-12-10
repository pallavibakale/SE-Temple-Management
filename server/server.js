const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const Service = require("./models/Service");
const Announcement = require("./models/Announcement");
const Appointment = require("./models/Appointments");
const Donations = require("./models/Donations");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const session = require("express-session");
const multer = require("multer");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const dbURI =
  "mongodb+srv://pallavib0996:HskKA5PlAYgA5U5h@templedb.c678m.mongodb.net/templedb?retryWrites=true&w=majority&appName=templedb";

// Connect to MongoDB
mongoose.connect(dbURI, {});

app.use(bodyParser.json());

// Set up multer for file storage in memory
const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(
  session({
    secret: "Team1", // This is a secret key used to sign the session ID cookie.
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store.
    cookie: { secure: false }, // True is recommended if your site uses HTTPS. Set to false otherwise.
  })
);

const corsOptions = {
  origin: "http://localhost:3000", // or use true to allow all origins
  credentials: true, // to support credentials like cookies
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization", // ensure this allows all headers needed
};

app.use(cors(corsOptions));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pallavib0996@gmail.com",
    pass: "",
  },
});

app.post("/request-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const otp = Math.floor(10000 + Math.random() * 90000).toString();
      user.otp = otp;
      await user.save();

      transporter.sendMail(
        {
          to: email,
          subject: "Reset Your Password",
          text: `Your OTP is ${otp}`,
        },
        (err, info) => {
          if (err) {
            console.error("Error sending email:", err);
            res.status(500).send("Could not send OTP");
          } else {
            console.log("Email sent: " + info.response);
            res.send("OTP sent");
          }
        }
      );
    } else {
      res.status(404).send("Email not found");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server error");
  }
});

// Endpoint to reset password
app.patch("/reset-password", async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await User.findOne({ email: email, otp: otp });
    if (user) {
      user.password = password;
      user.otp = ""; // Clear OTP after successful password reset
      await user.save();
      res.send("Password reset successful");
    } else {
      res.status(400).send("Invalid OTP or email");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server error");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  req.session.user = { id: user.empId };
  // Generate JWT Token
  const secret = "Team1";
  const token = jwt.sign({ id: user.empId }, secret, {
    expiresIn: "1h",
  });

  // Successful login
  return res
    .status(200)
    .json({ message: "Logged successfully", user: user, token: token });
});

app.post("/create-priest", async (req, res) => {
  const { firstName, lastName, email, phone, password, address } = req.body;
  const empId = Math.floor(10000 + Math.random() * 90000).toString();

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address,
      role: "Priest",
      empId,
    });

    // Save user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Server Error");
  }
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phone, password, address } = req.body;
  const empId = Math.floor(10000 + Math.random() * 90000).toString();

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address,
      role: "Devotee",
      empId,
    });

    // Save user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Server Error");
  }
});

app.post("/book-appointment", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).send("Error inserting appointment: " + error.message);
  }
});

app.get("/get-appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).send("Error fetching appointments: " + error.message);
  }
});

app.delete("/delete-appointment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).send("Appointment not found.");
    }
    res.status(200).send(`Appointment with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete the Appointment:", error);
    res.status(500).send("Error deleting appointment from the database");
  }
});

// Endpoint to update appointment status
app.patch("/update-appointment/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).send("Appointment not found");
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.patch("/reset-password", async (req, res) => {
  const { email, password, password1 } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const updated = await User.findByIdAndUpdate(
      email,
      { password: hashedPassword },
      { new: true }
    );
    if (!updated) {
      return res.status(404).send("User not found");
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.post("/get-priests", async (req, res) => {
  const { role } = req.body;
  try {
    const users = await User.find({ role: role });
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).send("Server error");
  }
});

app.get("/announcements", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).send("Error fetching announcements: " + error.message);
  }
});

app.post("/add-announcement", async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error adding announcement: " + error.message);
  }
});

app.put("/announcements/:id", async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(500).send("Error updating announcement: " + error.message);
  }
});

app.delete("/announcements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).send("Announcement not found.");
    }
    res.status(200).send(`Announcement with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete the announcement:", error);
    res.status(500).send("Error deleting announcement from the database");
  }
});

app.use(express.urlencoded({ extended: true }));

app.post("/add-service", upload.single("serviceImage"), async (req, res) => {
  const { title, cost, description } = req.body;
  const serviceImage = req.file
    ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
    : null;

  try {
    const newService = new Service({
      title,
      serviceImage,
      description,
      cost,
    });
    await newService.save();
    res.status(201).send("Service added successfully");
  } catch (error) {
    console.error("Failed to add the service:", error);
    res.status(500).send("Error adding service to the database");
  }
});

app.put("/services/:id", upload.single("serviceImage"), async (req, res) => {
  const { title, cost, description } = req.body;
  const serviceImage = req.file
    ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
    : null;
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        serviceImage: serviceImage,
        cost: cost,
        description: description,
      },
      { new: true }
    );
    res.json(updatedService);
  } catch (error) {
    res.status(500).send("Error updating announcement: " + error.message);
  }
});

app.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Failed to retrieve services:", error);
    res.status(500).send("Error retrieving services from the database");
  }
});

app.delete("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).send("Service not found.");
    }
    res.status(200).send(`Service with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete the service:", error);
    res.status(500).send("Error deleting service from the database");
  }
});

// Example backend handling, already provided earlier.
app.post("/events", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
});

app.put("/events/:id", async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(event);
});

app.delete("/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.post("/donate", async (req, res) => {
  const { address, city, state, zip, cardName, email, fullName, amount } =
    re.body;
  try {
    const newDonation = new Donations({
      address,
      city,
      state,
      zip,
      cardName,
      email,
      fullName,
      amount,
    });
    await newDonation.save();
    res.status(201).send("Donation added successfully");
  } catch (error) {
    console.error("Failed to donate:", error);
    res.status(500).send("Error adding donation to the database");
  }
});

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend's URL
    methods: ["GET", "POST"],
  },
});

// io.on('connection', (socket) => {
//   socket.on('signal', (data) => {
//     io.to(data.to).emit('signal', {
//       from: data.from,
//       signal: data.signal,
//     });

//   });
//   console.log('A user connected');

//   socket.on('join', (roomId) => {
//     socket.join(roomId);
//     socket.broadcast.to(roomId).emit('user-joined', socket.id);
//   });

//   socket.on('leave-room', (roomId) => {
//     socket.leave(roomId);
//     socket.broadcast.to(roomId).emit('user-left', socket.id);
//   });

//   socket.on('disconnect', () => {
//     socket.broadcast.emit('user-left', socket.id);
//     console.log('A user disconnected');
//   });
// });

// Example route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Set up the socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
