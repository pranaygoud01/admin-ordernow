import { createFileRoute,redirect } from '@tanstack/react-router'
import Orders from '../pages/Orders'

export const Route = createFileRoute('/orders')({
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
  return <Orders/>
}
