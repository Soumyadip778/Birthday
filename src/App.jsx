import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";
import RomanticBackground from "./components/RomanticBackground.jsx";
import PassCard from "./components/PassCard.jsx";
import CatPage from "./pages/CatPage.jsx";
import MemoriesPage from "./pages/MemoriesPage.jsx";
import MusicPage from "./pages/MusicPage.jsx";
import WishesPage from "./pages/WishesPage.jsx";
import CakeApp from "./pages/CakeApp.jsx";
import NotePage from "./pages/NotePage.jsx";
import FinalPage from "./pages/FinalPage.jsx";


function ProtectedRoute({ children }) {
  const unlocked =
    sessionStorage.getItem("unlocked") === "true";

  if (!unlocked) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {
  return (
    <BrowserRouter>

    <ScrollToTop />

      {/* Background stays behind every page */}
      <RomanticBackground />

      <Routes>

  {/* PASSWORD */}
  <Route
    path="/"
    element={<PassCard />}
  />

  {/* CAT */}
  <Route
    path="/cat"
    element={
      <ProtectedRoute>
        <CatPage />
      </ProtectedRoute>
    }
  />

  {/* MEMORIES */}
  <Route
    path="/memories"
    element={
      <ProtectedRoute>
        <MemoriesPage />
      </ProtectedRoute>
    }
  />

  {/* MUSIC */}
  <Route
    path="/music"
    element={
      <ProtectedRoute>
        <MusicPage />
      </ProtectedRoute>
    }
  />


  {/* WISHES */}

  <Route
  path="/wishes"
  element={
    <ProtectedRoute>
      <WishesPage />
    </ProtectedRoute>
  }
/>

  {/* CAKEPAGE */}
<Route
  path="/cake"
  element={
    <ProtectedRoute>
      <CakeApp />
    </ProtectedRoute>
  }
/>

{/* NOTEPAGE */}

<Route
  path="/note"
  element={
    <ProtectedRoute>
      <NotePage />
    </ProtectedRoute>
  }
/>

  {/* FINAL */}
  <Route
    path="/final"
    element={
      <ProtectedRoute>
        <FinalPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="*"
    element={<Navigate to="/" replace />}
  />

</Routes>

    </BrowserRouter>
  );
}

export default App;