import HomePage from "./components/UserHomePage/Home.jsx";
import Login from "./components/LoginPage/Login";
import Services from "./components/ServicesPage/Services.jsx";
import Education from "./components/EducationPage/Education.jsx";
import Events from "./components/EventManagePage/Events.jsx";
import AboutUs from "./components/AboutUsPage/AboutUs";
import LiveStreamCard from "./components/LiveStreamPage/LiveStreamCard.jsx";
import SignUp from "./components/SignUpPage/Signup.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UriContext from "./components/ContextApi/UriContext.jsx";
import AdminHome from "./components/AdminHomePage/AdminHome.jsx";
import AdminServices from "./components/AddServicesPage/AddServices.jsx";
import AppointmentForm from "./components/AppointmentPage/AppointmentForm.jsx";
import MyAppointment from "./components/ManageAppointments/MyAppointments";
import PriestCard from "./components/PriestsPage/Priest.jsx";
import Gallery from "./components/GalleryPage/Gallery.jsx";
import DonationsCard from "./components/DonationPage/DonationsCard";
import Donate from "./components/DonationPage/Donate.jsx";
import CreatePriest from "./components/CreatePriest/CreatePriest.jsx";
import PasswordReset from "./components/SignUpPage/PasswordReset.jsx";
import AppointmentConfirmation from "./components/AppointmentPage/AppointmentConfirmation";
import ContactUsCard from "./components/ContactUsPage/ContactUs";

function App() {
  const uriValue = "http://localhost:3001";
  localStorage.setItem("role", "");

  return (
    <div className="App">
      <UriContext.Provider value={uriValue}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/edu" element={<Education />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<ContactUsCard />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/live" element={<LiveStreamCard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-service" element={<AdminServices />} />
            <Route path="/schedule-appointment" element={<AppointmentForm />} />
            <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
            <Route path="/appointments" element={<MyAppointment />} />
            <Route path="/priest" element={<PriestCard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donations" element={<DonationsCard />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/add-priest" element={<CreatePriest />} />
            <Route path="/forgot-password" element={<PasswordReset />} />
          </Routes>
        </Router>
      </UriContext.Provider>
    </div>
  );
}

export default App;
