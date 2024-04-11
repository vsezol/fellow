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
        path: ':name',
        lazy: () => import('../pages/chat'),
      },
    ],
  },
]);
