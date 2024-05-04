/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import BookingManagement from 'views/admin/BookingManagement.js';
import TherapistSchedules from "views/admin/TherapistSchedules";
import Appointments from "views/admin/Appointments";
import ClientManagement from "views/admin/ClientManagement";
import AppointmentDetails from "views/admin/AppointmentDetails";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/booking-management",
    name: "Booking Management",
    icon: "ni ni-calendar-grid-58 text-red",
    component: <BookingManagement />,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/therapist-schedules",
    name: "Therapist Schedules",
    icon: "ni ni-time-alarm text-blue",
    component: <TherapistSchedules />,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/client-management",
    name: "Clients",
    icon: "ni ni-single-02 text-primary",
    component: <ClientManagement />,
    layout: "/admin",
    showInSidebar: true
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
    path: "/appointments",
    name: "Appointments",
    icon: "ni ni-calendar-grid-58 text-red",
    component: <Appointments />,
    layout: "/admin",
    showInSidebar: true
  },
  { path: '/appointments/:appointmentId', 
    name: 'Appointment Details', 
    component: <AppointmentDetails />,
    layout: "/admin",
    showInSidebar: false
  },  
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    showInSidebar: false
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
    showInSidebar: false
  },
];
export default routes;
