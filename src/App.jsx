import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";
import Applayout from "./ui/Applayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Applayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to={"/dashboard"} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:bookingId" element={<Booking />} />
            <Route path="/checkin/:bookingId" element={<CheckIn />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "12px",
            maxWidth: "600px",
            padding: "16px 24px",
            backgroundColor: " var(--color-grey-0)",
            color: "var(--color-grey-600)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
