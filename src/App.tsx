import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { router } from './routes';

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

