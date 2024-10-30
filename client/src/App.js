import './App.css';
import HomePage from './components/Home';
import Login from "./components/Login";
import Services from "./components/Services";
import Education from "./components/Education";
import Events from "./components/Events";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import LiveStreamCard from "./components/LiveStreamCard";
import SignUp from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UriContext from './components/UriContext';
import AdminHome from './components/AdminHome';
import AdminServices from './components/AdminServices';
import AppointmentForm from './components/AppointmentForm';
import MyAppointment from './components/MyAppointments';
import PriestCard from './components/Priest';
import Gallery from './components/Gallery';
import DonationsCard from './components/DonationsCard';
import Donate from './components/Donate';
import CreatePriest from './components/CreatePriest';
import PasswordReset from './components/PasswordReset';


function App() {

  const uriValue = 'http://localhost:3001';
  localStorage.setItem('role', '');

  return (
    <div className="App">
      <UriContext.Provider value={uriValue}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path='/edu' element={<Education/> }/>
          <Route path='/events' element={<Events/>} />
          <Route path="/contact" element={<ContactUs/> }/>
          <Route path="/mission" element={<AboutUs/> }/>
          <Route path="/live" element={<LiveStreamCard />} />
          <Route path="/signup" element={<SignUp/> }/>
          <Route path='/admin-home' element={<AdminHome />}/>
          <Route path='/admin-service' element={<AdminServices />}/>
          <Route path='/schedule-appointment' element={<AppointmentForm />}/>
          <Route path='/appointments' element={<MyAppointment />}/>
          <Route path='/priest' element={<PriestCard />}/>
          <Route path='/gallery' element={<Gallery />}/>
          <Route path='/donations' element={<DonationsCard />}/>
          <Route path="/card-details" element={<Donate/>}/>
          <Route path="/add-priest" element={<CreatePriest/>}/>
          <Route path="/forgot-password" element={<PasswordReset/>}/>
        </Routes>
      </Router>
      </UriContext.Provider>
    </div>
  );
}

export default App;
