import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../routes/ProtectedRoute';
import AIAssistantPage from '../pages/AIAssistantPage';
import CheckoutPage from '../pages/CheckoutPage';
import DashboardPage from '../pages/DashboardPage';
import ExploreHotelsPage from '../pages/ExploreHotelsPage';
import HotelDetailsPage from '../pages/HotelDetailsPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RecommendationsPage from '../pages/RecommendationsPage';
import RegisterPage from '../pages/RegisterPage';
import WriteReviewPage from '../pages/WriteReviewPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/explore" element={<ExploreHotelsPage />} />
          <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews/new"
            element={
              <ProtectedRoute>
                <WriteReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assistant"
            element={
              <ProtectedRoute>
                <AIAssistantPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <RecommendationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
