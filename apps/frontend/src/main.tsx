import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NewList } from './pages/new-list';
import { Root } from './pages/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/new-list',
    element: <NewList />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
