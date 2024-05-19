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
import { BuildingFormAdd, BuildingFormEdit } from "./components/forms/building/BuildingForms.tsx";
import { ApartmentFormAdd, ApartmentFormEdit } from "./components/forms/apartment/ApartmentForms.tsx";
import { PriceListFormAdd, PriceListFormEdit } from "./components/forms/priceList/PriceListForms.tsx";
import { PersonFormAdd, PersonFormEdit } from "./components/forms/person/PersonForms.tsx";
import { RegistrationFormAdd, RegistrationFormEdit } from "./components/forms/registration/ResistrationForms.tsx";
import RegistrationsOfBuilding from "./pages/RegistrationsOfBuilding.tsx";
import DisplayRegistration from "./pages/DisplayRegistration.tsx";
import DisplayPerson from "./pages/DisplayPerson.tsx";

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
        path: "budynki/:buildingId/:apartmentId/cennik",
        element: <PricesList />,
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
            path: "budynki/:buildingId/dodaj",
            element: <ApartmentFormAdd />,
          },
          {
            path: "budynki/:buildingId/:apartmentId/edytuj",
            element: <ApartmentFormEdit />,
          },
          {
            path: "budynki/dodaj",
            element: <BuildingFormAdd />,
          },
          {
            path: "budynki/:buildingId/edytuj",
            element: <BuildingFormEdit />,
          },
          {
            path: "meldunki/:buildingId",
            element: <RegistrationsOfBuilding />,
          },
          {
            path: "meldunki/:buildingId/:registrationId",
            element: <DisplayRegistration />,
          },
          {
            path: "osoby/dodaj",
            element: <PersonFormAdd />,
          },
          {
            path: "osoby/:personId/edytuj",
            element: <PersonFormEdit />,
          },
          {
            path: "budynki/:buildingId/:apartmentId/cennik/dodaj",
            element: <PriceListFormAdd />,
          },
          {
            path: "budynki/:buildingId/:apartmentId/cennik/:priceListId",
            element: <PriceListFormEdit />,
          },
          {
            path: "meldunki/:buildingId/dodaj",
            element: <RegistrationFormAdd />,
          },
          {
            path: "meldunki/:buildingId/:registrationId/edytuj",
            element: <RegistrationFormEdit />,
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
