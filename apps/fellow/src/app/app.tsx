import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { BreakpointProvider, usePreferredThemeMetaSync } from '../shared';
import { setVhVariable } from '../shared/lib/set-vh-variable';
import { useWindowResize } from '../shared/lib/use-window-resize';
import { store } from '../store';
import './globals.css';
import './icons';
import { router } from './router';

export function App() {
  useWindowResize(setVhVariable);
  usePreferredThemeMetaSync();

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
