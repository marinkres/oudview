import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import SearchPage from "./components/catalog/SearchPage";
import FragrancePage from "./components/catalog/FragrancePage";
import ProfilePage from "./components/profile/ProfilePage";
import About from "./components/catalog/About";  // Import the About page
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/fragrance/:id" element={<FragrancePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/about" element={<About />} />  {/* Add the route for the About page */}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
