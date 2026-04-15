import { AuthProvider } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';
import { PreferencesProvider } from '../context/PreferencesContext';
import { ReviewsProvider } from '../context/ReviewsContext';

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <PreferencesProvider>
          <ReviewsProvider>{children}</ReviewsProvider>
        </PreferencesProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

export default AppProviders;
