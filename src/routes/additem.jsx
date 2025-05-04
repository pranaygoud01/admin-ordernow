import { createFileRoute, redirect } from '@tanstack/react-router'
import Additem from "../pages/Additem"

export const Route = createFileRoute('/additem')({
  component: RouteComponent,
  beforeLoad: () => {
    const isExist = localStorage.getItem('authToken');
    if (!isExist) {
      throw redirect({
        to: '/',
      });
    }
  },
})

function RouteComponent() {
  return <Additem />;
}
