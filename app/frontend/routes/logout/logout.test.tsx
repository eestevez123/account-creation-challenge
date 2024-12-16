import React from 'react';
import { render } from '@testing-library/react';
import { Logout } from './logout';
import { Navigate } from 'react-router-dom';
import { jest, describe, expect, it} from '@jest/globals';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as object,
  Navigate: jest.fn(),
}));

describe('Logout Component', () => {
  it('should render a Navigate component to "/"', () => {
    render(<Logout />);
    
    // Assert that Navigate is called with the correct props
    expect(Navigate).toHaveBeenCalledWith(
      { to: '/', replace: true },
      {}
    );
  });
});
