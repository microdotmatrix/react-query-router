import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { QueryClient } from "@tanstack/react-query";

import ErrorPage from "./error-page";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
const Contact = React.lazy(() => import('./routes/contact'));
import {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
const EditContact = React.lazy(() => import('./routes/edit'));
import { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
const Index = React.lazy(() => import("./routes/index"));

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader(queryClient),
    action: rootAction(queryClient),
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={"Loading..."}>
            <Index />
          </React.Suspense>
        )
      },
      {
        path: "contacts/:contactId",
        element: (
          <React.Suspense fallback={"Loading..."}>
            <Contact />
          </React.Suspense>
        ),
        loader: contactLoader(queryClient),
        action: contactAction(queryClient),
      },
      {
        path: "contacts/:contactId/edit",
        element: (
          <React.Suspense fallback={"Loading..."}>
            <EditContact />
          </React.Suspense>
        ),
        loader: contactLoader(queryClient),
        action: editAction(queryClient),
      },
      {
        path: "contacts/:contactId/destroy",
        element: (
          <React.Suspense fallback={"Loading..."}>
            <EditContact />
          </React.Suspense>
        ),
        action: destroyAction(queryClient),
        errorElement: <div>Oops! There was an error.</div>
      },
    ],
  },
]);