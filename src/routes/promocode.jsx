import { createFileRoute } from '@tanstack/react-router'
import Promocode from '../pages/Promocode'
export const Route = createFileRoute('/promocode')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Promocode/>
}
