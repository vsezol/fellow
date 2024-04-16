import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { BreakpointProvider } from '../shared';
import { store } from '../store';
import './globals.css';
import './icons';
import { router } from './router';

export function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <BreakpointProvider>
          <RouterProvider router={router} />
        </BreakpointProvider>
      </Provider>
    </StrictMode>
  );
}

export default App;
