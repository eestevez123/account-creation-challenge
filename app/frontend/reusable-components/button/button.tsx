import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  classesOverride?: string;
}

const defaultClasses = 'inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white';

export function Button({ href, children, type, classesOverride }: Props) {
  const classes = (classesOverride)? classesOverride : defaultClasses;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
