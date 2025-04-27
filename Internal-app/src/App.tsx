// Third Party
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// Pages
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
// Style
import GlobalStyles from "./styles/GlobalStyles";
// UI
import AppLayout from "./ui/Layouts/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    // staleTime: amount of time that the data in the cache will stay fresh,
    // untils it is refetched again. Keep to one minute. Specifying a longer
    // staleTime means queries will not refetch their data as often
    queries: { staleTime: 60 * 1000 },
  },
});

function App(): React.ReactElement {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to={"/dashboard"} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:bookingId" element={<Booking />} />
              <Route path="/checkin/:bookingId" element={<Checkin />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position={"top-center"}
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            // Define default options
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
