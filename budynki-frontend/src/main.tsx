import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page.tsx";
import Registrations from "./pages/Registrations.tsx";
import Repairs from "./pages/Repairs.tsx";
import Persons from "./pages/Persons.tsx";
import Payments from "./pages/Payments.tsx";
import Reports from "./pages/Reports.tsx";
import Buildings from "./pages/Buildings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="budynki" />,
      },
      {
        path: "budynki",
        element: <Buildings />,
      },
      {
        path: "meldunki",
        element: <Registrations />,
      },
      {
        path: "zgloszenia",
        element: <Repairs />,
      },
      {
        path: "osoby",
        element: <Persons />,
      },
      {
        path: "platnosci",
        element: <Payments />,
      },
      {
        path: "raporty",
        element: <Reports />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
