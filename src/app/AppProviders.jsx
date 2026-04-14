import { AuthProvider } from '../context/AuthContext';
import { ReviewsProvider } from '../context/ReviewsContext';

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ReviewsProvider>{children}</ReviewsProvider>
    </AuthProvider>
  );
}

export default AppProviders;
