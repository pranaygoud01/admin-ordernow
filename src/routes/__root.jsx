import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import NavBar from '../components/NavBar'
import { useLocation } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <React.Fragment>

{currentPath !== '/' && <NavBar />}
      <Outlet />
    </React.Fragment>
  )
}
