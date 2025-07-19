import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GigList from "./pages/GigList";
import GigDetail from "./pages/GigDetail";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyOrders from "./pages/MyOrders";
import ChatPage from "./pages/ChatPage";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import CreateGig from "./pages/CreateGig";
import ClientDashboard from "./pages/ClientDashboard";
import MainNavbar from "./components/Navbar";
import FreelancerLayout from "./components/FreelancerLayout";
import ClientLayout from "./components/ClientLayout";



function App() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?._id;

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Main layout with default Navbar */}
        <Route
          path="/"
          element={
            <>
              <MainNavbar />
              <h1 className="text-center mt-10 text-2xl">Welcome to Freelancer Marketplace</h1>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <MainNavbar />
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <MainNavbar />
              <Login />
            </>
          }
        />
        <Route
          path="/gigs"
          element={
            <>
              <MainNavbar />
              <GigList />
            </>
          }
        />
        <Route
          path="/gig/:id"
          element={
            <>
              <MainNavbar />
              <GigDetail />
            </>
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/chat/:receiverId" element={<ChatPage userId={loggedInUserId} />} />

        {/* ✅ Freelancer Routes with Freelancer Navbar */}
        {/* <Route element={<FreelancerLayout />}> */}
          {/* <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} /> */}
          <Route path="/freelancer" element={<FreelancerLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<FreelancerDashboard />} />
            <Route path="gigs/:id" element={<GigDetail />} />
            <Route path="create-gig" element={<CreateGig />} />
            <Route path="gigs" element={<GigList />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="chat/:receiverId" element={<ChatPage userId={loggedInUserId} />} />
          </Route>



        {/* ✅ Client Dashboard */}
        <Route path="/client" element={<ClientLayout />}>
           <Route path="dashboard" element={<ClientDashboard />} />
           <Route path="gigs" element={<GigList />} />
           <Route path="gig/:id" element={<GigDetail />} />
           <Route path="orders" element={<MyOrders />} />
           <Route path="chat/:receiverId" element={<ChatPage userId={loggedInUserId} />} />
        </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
