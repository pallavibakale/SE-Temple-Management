# Temple Management System

A comprehensive web application for managing temple operations, including appointments, donations, events, live streaming, and more. This system provides role-based access for Admins, Priests, and Devotees.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [User Roles & Credentials](#user-roles--credentials)
- [Project Structure](#project-structure)
- [Testing](#testing)

## ✨ Features

### Admin Features

- Manage users (Devotees and Priests)
- Manage temple services
- Create and manage events
- View and manage donations
- Post announcements
- Manage appointments

### Priest Features

- View and manage appointments
- Conduct live streaming sessions
- Manage service offerings

### Devotee Features

- Book appointments with priests
- Make donations
- View temple events and announcements
- Access educational content
- Watch live streams
- View temple gallery
- Contact temple administration

## 🛠️ Tech Stack

### Frontend

- **React** 18.2.0
- **React Router DOM** 6.23.0
- **Bootstrap** 5.3.3
- **React Bootstrap** 2.10.2
- **FullCalendar** 6.1.x
- **Socket.io Client** 4.8.1
- **React Toastify** 10.0.5
- **FontAwesome Icons**

### Backend

- **Node.js**
- **Express** 4.21.1
- **MongoDB** with Mongoose 8.7.3
- **Socket.io** 4.8.1
- **JWT** for authentication
- **bcrypt** for password hashing
- **Nodemailer** for email services

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pallavibakale/SE-Temple-Management.git
   cd SE-Temple-Management
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## ⚙️ Configuration

### Database Setup

1. Create a MongoDB database (local or using MongoDB Atlas)
2. Open `server/server.js`
3. Update the `mongoURL` variable with your MongoDB connection string:
   ```javascript
   const mongoURL = "your-mongodb-connection-string";
   ```

### Environment Variables (Optional)

Create a `.env` file in the `server` directory for sensitive configurations:

```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

## 🏃 Running the Application

### Start the Backend Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` (or your configured port)

### Start the Frontend Client

1. Open a new terminal and navigate to the client directory:

   ```bash
   cd client
   ```

2. Start the React application:
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

## 👥 User Roles & Credentials

### Admin Account

- **Email:** admin@gmail.com
- **Password:** Admin@123
- **Access:** Full system administration capabilities

### Priest Account

- **Email:** priest@gmail.com
- **Password:** Priest@123
- **Access:** Appointment management and live streaming

### Devotee Account

- **Email:** john@gmail.com
- **Password:** John@123
- **Access:** Book appointments, make donations, view content

### New User Registration

Users can also register as devotees through the signup page to test the system from a patron's perspective.

## 📁 Project Structure

```
SE-Temple-Management/
├── client/                 # Frontend React application
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── AboutUsPage/
│   │   │   ├── AddEventsPage/
│   │   │   ├── AddServicesPage/
│   │   │   ├── AnnouncementPage/
│   │   │   ├── AppointmentPage/
│   │   │   ├── DonationPage/
│   │   │   ├── EventManagePage/
│   │   │   ├── LoginPage/
│   │   │   ├── ManageUsers/
│   │   │   └── ... (other components)
│   │   ├── images/        # Image assets
│   │   └── App.js         # Main application component
│   └── package.json
│
├── server/                # Backend Node.js/Express application
│   ├── models/           # MongoDB models
│   │   ├── User.js
│   │   ├── Appointments.js
│   │   ├── Donations.js
│   │   ├── Service.js
│   │   └── Announcement.js
│   ├── routes/           # API routes
│   │   ├── index.js
│   │   └── users.js
│   ├── server.js         # Main server file
│   └── package.json
│
└── README.md
```

## 🧪 Testing

### Testing as a Devotee

1. Log in with the devotee credentials or create a new account
2. Navigate to the appointments section
3. Book an appointment with a priest
4. Explore other features like donations, events, and gallery

### Testing as a Priest

1. Log in with the priest credentials
2. View and manage appointment requests
3. Start a live streaming session
4. Manage services

### Testing as an Admin

1. Log in with the admin credentials
2. Access the admin dashboard
3. Manage users, services, events, and donations
4. Post announcements
5. View all appointments

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Pallavi Bakale**

## 📧 Support

For issues or questions, please create an issue in the GitHub repository.
