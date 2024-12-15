import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root/root.tsx';
import { CreateAccount } from './routes/create-account/create-account.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
]);

export function Router() {
  return (
    <main className="h-screen w-screen">
      <div className="h-full w-full max-w-[1200px] my-0 mx-auto">
        <RouterProvider router={router} />
      </div>
    </main>
  );
}
