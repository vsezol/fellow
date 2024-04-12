import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'user',
        lazy: () => import('../pages/user'),
      },
      {
        path: ':chat',
        lazy: () => import('../pages/chat'),
      },
    ],
  },
]);
