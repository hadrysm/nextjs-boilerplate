import { ReactNode } from 'react';

type ExampleProps = {
  children?: ReactNode;
};

export const Example = ({ children }: ExampleProps) => (
  <div>
    <h1>{children}</h1>
  </div>
);
