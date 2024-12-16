import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root/root.tsx';
import { AccountSelection } from './routes/signup/account-selection/account-selection.tsx';
import { CreateUser } from './routes/signup/create-user/create-user.tsx';
import { Deposit } from './routes/signup/deposit/deposit.tsx';
import { JointAccess } from './routes/signup/joint-access/joint-access.tsx';
import { StockRestrictions } from './routes/signup/stock-restrictions/stock-restrictions.tsx';
import { CreateAccount } from './routes/create-account/create-account.tsx'
import { Logout } from './routes/logout/logout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/signup/account-selection',
    element: <AccountSelection />,
  },
  {
    path: '/signup/create-user',
    element: <CreateUser />,
  },
  {
    path: '/signup/joint-access',
    element: <JointAccess />,
  },
  {
    path: '/signup/stock-restrictions',
    element: <StockRestrictions />,
  },
  {
    path: '/signup/deposit',
    element: <Deposit />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },{
    path: '/logout',
    element: <Logout />, // Redirect to root or desired page
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
