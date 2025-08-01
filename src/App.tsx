import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routing/AppRoutes';
import './index.css';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;