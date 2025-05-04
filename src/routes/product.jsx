import { createFileRoute,redirect } from '@tanstack/react-router'
import Products from '../pages/Products'

export const Route = createFileRoute('/product')({
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
  return  <Products/>
}
