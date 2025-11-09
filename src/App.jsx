// src/App.jsx
//
// Defines the route structure for the Creatorverse application.  We use the
// `useRoutes` hook from React Router to declaratively map paths to
// components.  This approach is outlined in the React Router v6
// documentation, where a route configuration array is passed to
// `useRoutes` and the resulting element tree is returned【406024190046859†L124-L146】.

import { useRoutes } from 'react-router-dom';

// Import the pages that correspond to each route.  Each page is a
// self‑contained component responsible for fetching its own data and
// rendering its part of the UI.
import HomePage from './pages/HomePage.jsx';
import AddCreator from './pages/AddCreator.jsx';
import CreatorDetail from './pages/CreatorDetail.jsx';
import EditCreator from './pages/EditCreator.jsx';

export default function App() {
  // Define our route configuration.  Dynamic segments (e.g. `:id`) will be
  // matched by React Router and passed to the page components via the
  // `useParams` hook.
  const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/creators/:id', element: <CreatorDetail /> },
    { path: '/creators/:id/edit', element: <EditCreator /> },
    { path: '*', element: <div>404 Not Found</div> },
  ];
  // Generate the element tree based on our route configuration【406024190046859†L135-L146】.
  const element = useRoutes(routes);
  return element;
}