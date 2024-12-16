import React from 'react';
import { Link } from 'react-router-dom';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';

export function Root() {
  return (
    <FlowLayout>
      <div>
        <Link to="/signup/account-selection" className="text-xl">
          Get started
        </Link>
      </div>
      <div>
        <Link to="/create-account" className="text-xl">
          Create Account
        </Link>
      </div>
    </FlowLayout>
  );
}
