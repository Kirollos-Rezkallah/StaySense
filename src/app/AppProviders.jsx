import { AuthProvider } from '../context/AuthContext';
import { PreferencesProvider } from '../context/PreferencesContext';
import { ReviewsProvider } from '../context/ReviewsContext';

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <ReviewsProvider>{children}</ReviewsProvider>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default AppProviders;
