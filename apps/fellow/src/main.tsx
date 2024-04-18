import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { setVhVariable } from './shared/lib/set-vh-variable';

setVhVariable();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
