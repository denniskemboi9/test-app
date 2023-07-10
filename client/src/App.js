import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddProperty from "./Pages/AddProperty";
import LandingPage from "./Pages/Landingpage";
import Profile from "./Pages/Profile";
import Booking from "./Pages/Booking";
import ApproveProperty from "./Pages/ApproveProperty";
import AuthProvider from "./Context/AuthContext";
import PropertyProvider from "./Context/PropertyContext";
import BookingsProvider from "./Context/BookingsContext"

function App() {
    return (
  
        <BrowserRouter>
            <AuthProvider>
                <PropertyProvider>
                    <BookingsProvider>
            
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />}/>
                    <Route path="/Home" element={<Home />}/>
                    <Route path="/Login" element={<Login />}/>
                    <Route path="/Register" element={<Register />}/>
                    <Route path="/AddProperty" element={<AddProperty />}/>
                    <Route path="/Profile" element={<Profile />}/>
                    <Route path="/ApproveProperty" element={<ApproveProperty />}/>
                    <Route path="/Booking" element={<Booking/>} />
                    </Route>
                </Routes>

                    </BookingsProvider>
                </PropertyProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App