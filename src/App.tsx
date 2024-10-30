import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";

export default function App() {
  const query = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={query}>
      <Home/>
      </QueryClientProvider>
    </div>
  )
}
