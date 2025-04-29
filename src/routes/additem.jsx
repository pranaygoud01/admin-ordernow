import { createFileRoute } from '@tanstack/react-router'
import Additem from "../pages/Additem"

export const Route = createFileRoute('/additem')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <Additem/>
}
