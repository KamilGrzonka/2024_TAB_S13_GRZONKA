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
import PricesList from "./pages/PricesList.tsx";
import DisplayApartment from "./pages/DisplayApartment.tsx";
import DisplayForm from "./components/forms/DisplayForm.tsx";
import { BuildingFormAdd } from "./components/forms/building/BuildingForms.tsx";
import { ApartmentFormAdd, ApartmentFormEdit } from "./components/forms/apartment/ApartmentForms.tsx";
import { PriceListFormAdd, PriceListFormEdit } from "./components/forms/priceList/PriceListForms.tsx";
import { PersonFormAdd, PersonFormEdit } from "./components/forms/person/PersonForms.tsx";

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
        path: "budynki/:buildingId",
        element: <Apartments />,
      },
      {
        path: "budynki/:buildingId/:apartmentId",
        element: <DisplayApartment />,
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
        path: "osoby/:personId",
        element: <DisplayPerson />,
      },
      {
        path: "platnosci",
        element: <Payments />,
      },
      {
        path: "raporty",
        element: <Reports />,
      },
      {
        element: <DisplayForm />,
        children: [
          {
            path: "budynki/dodaj",
            element: <BuildingFormAdd />,
          },
          {
            path: "budynki/:buildingId/dodaj",
            element: <ApartmentFormAdd />,
          },
          {
            path: "budynki/:buildingId/:apartmentId/edytuj",
            element: <ApartmentFormEdit />,
          },
          {
            path: "budynki/:buildingId/:apartmentId/dodaj",
            element: <PriceListFormAdd />,
          },
          {
            path: "budynki/:buildingId/:apartmentId/:priceListId",
            element: <PriceListFormEdit />,
          },
          {
            path: "osoby/dodaj",
            element: <PersonFormAdd />,
          },
          {
            path: "osoby/:personId/edytuj",
            element: <PersonFormEdit />,
          },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
