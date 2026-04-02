import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainLayout from './components/layout/MainLayout';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import RequestsPage from './pages/RequestsPage';
import MessengerPage from './pages/MessengerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/messenger" element={<MessengerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

