import { createFileRoute } from '@tanstack/react-router'

const ModelsRoute =() => {
  return <div>Hello "/_app/models/"!</div>
}

export const Route = createFileRoute('/_app/models/')({
  component: ModelsRoute,
})
