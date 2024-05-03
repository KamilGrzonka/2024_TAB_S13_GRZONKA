import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page";
import Persons from './pages/Persons';
import Payments from './pages/Payments';
import Registartions from './pages/Registrations';
import Repairs from './pages/Repairs';
import Reports from './pages/Reports';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "meldunki",
        element: <Registartions />
      },
      {
        path: "zgloszenia",
        element: <Repairs />
      },
      {
        path: "osoby",
        element: <Persons />
      },
      {
        path: "platnosci",
        element: <Payments />
      },
      {
        path: "raporty",
        element: <Reports />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
