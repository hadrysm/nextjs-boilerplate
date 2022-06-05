import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const MainLayout: FC<Props> = ({ children }) => <main>{children}</main>;
