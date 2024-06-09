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
import TasksList from "./pages/TasksList.tsx";
import DisplayApartment from "./pages/DisplayApartment.tsx";
import DisplayForm from "./components/forms/DisplayForm.tsx";
import { BuildingFormAdd, BuildingFormEdit } from "./components/forms/building/BuildingForms.tsx";
import { ApartmentFormAdd, ApartmentFormEdit } from "./components/forms/apartment/ApartmentForms.tsx";
import { PriceListFormAdd, PriceListFormEdit } from "./components/forms/priceList/PriceListForms.tsx";
import { PersonFormAdd, PersonFormEdit } from "./components/forms/person/PersonForms.tsx";
import { RegistrationFormAdd, RegistrationFormEdit } from "./components/forms/registration/ResistrationForms.tsx";
import RegistrationsOfBuilding from "./pages/RegistrationsOfBuilding.tsx";
import BuildingPayments from "./pages/PaymentsOfBuilding.tsx";
import BuildingRepairs from "./pages/RepairsOfBuilding.tsx";
import DisplayRegistration from "./pages/DisplayRegistration.tsx";
import DisplayRepair from "./pages/DisplayRepair.tsx";
import DisplayPerson from "./pages/DisplayPerson.tsx";
import DisplayCompany from "./pages/DisplayCompany.tsx";
import DisplayTask from "./pages/DisplayTask.tsx";
import DisplayPayment from "./pages/DisplayPayment.tsx";
import { CompanyFormAdd, CompanyFormEdit } from "./components/forms/company/CompanyForms.tsx";
import { RepairFormAdd, RepairFormEdit } from "./components/forms/repair/RepairForms.tsx";
import Companies from "./pages/Companies.tsx";
import { TaskFormAdd, TaskFormEdit } from "./components/forms/task/TaskForms.tsx";
import TasksOfCompany from "./pages/TasksOfCompany.tsx";
import { IncomingPaymentFormAdd, IncomingPaymentFormEdit } from "./components/forms/incomingPayment/IncomingPaymentForms.tsx";
import { OutgoingPaymentFormAdd, OutgoingPaymentFormEdit } from "./components/forms/outgoingPayment/OutgoingPaymentForms.tsx";

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
        path: "zgloszenia/:buildingId",
        element: <BuildingRepairs />,
      },
      {
        path: "zgloszenia/:buildingId/:repairId",
        element: <DisplayRepair />,
      },
      {
        path: "zgloszenia/:buildingId/:repairId/zadania",
        element: <TasksList />,
      },
      {
        path: "zgloszenia/:buildingId/:repairId/zadania/:taskId",
        element: <DisplayTask />,
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
        path: "platnosci/:buildingId",
        element: <BuildingPayments />,
      },
      {
        path: "platnosci/:buildingId/:paymentId",
        element: <DisplayPayment />,
      },
      {
        path: "firmy",
        element: <Companies />,
      },
      {
        path: "firmy/:companyId",
        element: <DisplayCompany />,
      },
      {
        path: "firmy/:companyId/zadania",
        element: <TasksOfCompany />,
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
          {
            path: "firmy/dodaj",
            element: <CompanyFormAdd />,
          },
          {
            path: "firmy/:companyId/edytuj",
            element: <CompanyFormEdit />,
          },
          {
            path: "zgloszenia/:buildingId/dodaj",
            element: <RepairFormAdd />,
          },
          {
            path: "zgloszenia/:buildingId/:repairId/edytuj",
            element: <RepairFormEdit />,
          },
          {
            path: "zgloszenia/:buildingId/:repairId/zadania/dodaj",
            element: <TaskFormAdd />,
          },
          {
            path: "zgloszenia/:buildingId/:repairId/zadania/:taskId/edytuj",
            element: <TaskFormEdit />,
          },
          {
            path: "platnosci/:buildingId/przychodzacedodaj",
            element: <IncomingPaymentFormAdd />,
          },
          {
            path: "platnosci/:buildingId/:paymentId/przychodzaceedytuj",
            element: <IncomingPaymentFormEdit />,
          },
          {
            path: "platnosci/:buildingId/wychodzacedodaj",
            element: <OutgoingPaymentFormAdd />,
          },
          {
            path: "platnosci/:buildingId/:paymentId/wychodzaceedytuj",
            element: <OutgoingPaymentFormEdit />,
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
