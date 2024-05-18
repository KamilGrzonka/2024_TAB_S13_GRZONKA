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
import Apartments from "./pages/Apartments.tsx";
import AddBuilding from "./pages/AddBuilding.tsx";
import DisplayPerson from "./pages/DisplayPerson.tsx";
import EditPerson from "./pages/EditPerson.tsx";
import AddPerson from "./pages/AddPerson.tsx";
import DisplayApartment from "./pages/DisplayApartment.tsx";
import AddApartment from "./pages/AddApartment.tsx";
import EditApartment from "./pages/EditApartment.tsx";
import EditPriceList from "./pages/EditPriceList.tsx";
import AddPriceList from "./pages/AddPriceList.tsx";

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
        path: "budynki/dodaj",
        element: <AddBuilding />,
      },
      {
        path: "budynki/:buildingId",
        element: <Apartments />,
      },
      {
        path: "budynki/:buildingId/:apartmentId",
        element: <DisplayApartment />,
      },
      {
        path: "budynki/:buildingId/dodaj",
        element: <AddApartment />,
      },
      {
        path: "budynki/:buildingId/:apartmentId/edytuj",
        element: <EditApartment />,
      },
      {
        path: "budynki/:buildingId/:apartmentId/dodaj",
        element: <AddPriceList />,
      },
      {
        path: "budynki/:buildingId/:apartmentId/:priceListId",
        element: <EditPriceList />,
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
        path: "osoby/dodaj",
        element: <AddPerson />,
      },
      {
        path: "osoby/:personId",
        element: <DisplayPerson />,
      },
      {
        path: "osoby/:personId/edytuj",
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
