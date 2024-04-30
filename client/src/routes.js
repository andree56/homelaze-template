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
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import BookingManagement from 'views/admin/BookingManagement.js';
// import ClientManagement from 'views/admin/ClientManagement.js';
import TherapistSchedules from "views/admin/TherapistSchedules";
import Appointments from "views/admin/Appointments";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/booking-management",
    name: "Booking Management",
    icon: "ni ni-calendar-grid-58 text-red",
    component: <BookingManagement />,
    layout: "/admin",
  },
  {
    path: "/therapist-schedules",
    name: "Therapist Schedules",
    icon: "ni ni-time-alarm text-blue",
    component: <TherapistSchedules />,
    layout: "/admin",
  },
  // {
  //   path: "/client-management",
  //   name: "Client Management",
  //   icon: "ni ni-archive-2 text-green",
  //   component: <ClientManagement />,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
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
    component: Appointments,
    layout: "/admin",
  },
  
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
