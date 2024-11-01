import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from "./router/root";
import { ProfileProvider } from './util/profileContext';

function App() {
  return (
    <ProfileProvider>
        <RouterProvider router={root} />
    </ProfileProvider>
  );
}

export default App;
