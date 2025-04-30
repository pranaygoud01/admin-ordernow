import * as React from 'react';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';
import NavBar from '../components/NavBar';
import { Toaster } from 'react-hot-toast'; // ✅ Make sure you import Toaster

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <React.Fragment>
      <Toaster position="top-center" />
      {currentPath !== '/' && <NavBar />}
      <Outlet />
    </React.Fragment>
  );
}
