import { createFileRoute,redirect } from '@tanstack/react-router'
import Promocode from '../pages/Promocode'
export const Route = createFileRoute('/promocode')({
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
  return <Promocode/>
}
