import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CompleteProfile from "./pages/CompleteProfile";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";
import ProfilePage from "./pages/ProfilePage";
import { useUserProfile } from "./hooks/useUserProfile";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const { data: meData, isLoading: meLoading } = useUserProfile();

  // this will get rid of the flickering effect
  if (!isLoaded) return null;

  // If signed in and server says profile not completed, force onboarding
  if (isSignedIn && !meLoading && meData && meData.user && meData.user.profileCompleted === false) {
    return (
      <Routes>
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="*" element={<Navigate to="/complete-profile" />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/complete-profile" element={isSignedIn ? <CompleteProfile /> : <Navigate to={'/'} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path="/profile" element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
