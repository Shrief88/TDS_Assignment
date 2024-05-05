import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Reservation from "./pages/Reservation";
import CreateStudio from "./pages/CreateStudio";
import PersisttentLogin from "./components/PersisttentLogin";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="h-full">
      <div className="relative h-full antialiased font-Poppins">
        <div className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PersisttentLogin />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/studio/:id" element={<Studio />} />
                  <Route path="/reservation/:id" element={<Reservation />} />
                  <Route path="/create-studio" element={<CreateStudio />} />
                </Route>
              </Route>
            </Routes>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
