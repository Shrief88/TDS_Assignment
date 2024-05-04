import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Studio from "./pages/Studio";

function App() {
  return (
    <div className="h-full">
      <div className="relative h-full antialiased font-Poppins">
        <div className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/studio/:id" element={<Studio />} />
            </Routes>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
