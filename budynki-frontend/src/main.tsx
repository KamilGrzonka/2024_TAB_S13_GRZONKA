import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./error-page.tsx";
import Registrations from "./pages/Registrations.tsx";
import Repairs from "./pages/Repairs.tsx";
import Persons from "./pages/Persons.tsx";
import Payments from "./pages/Payments.tsx";
import Reports from "./pages/Reports.tsx";
import Buildings from "./pages/Buildings.tsx";
import NewBuilding from "./pages/NewBuilding.tsx";
import DisplayPerson from "./pages/DisplayPerson.tsx";
import EditPerson from "./pages/EditPerson.tsx";
import AddPerson from "./pages/AddPerson.tsx";

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
        path: "budynki/nowy",
        element: <NewBuilding />,
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
        path: "osoby/nowy",
        element: <AddPerson />,
      },
      {
        path: "osoby/:id",
        element: <DisplayPerson />,
      },
      {
        path: "osoby/:id/edytuj",
        element: <EditPerson />,
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
