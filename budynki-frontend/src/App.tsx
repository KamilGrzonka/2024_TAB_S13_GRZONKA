import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex">
        <div className="w-[18rem]">
          <Navbar />
        </div>
        <main className="w-full">
          <Outlet />
        </main>
        <Toaster />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
