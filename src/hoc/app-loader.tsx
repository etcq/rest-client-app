'use client';

import useVariablesStorage from '@/hooks/use-variables-storage';
import { useAuthStore } from '@/store/auth-store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: IProps) => {
  const { data: session, status } = useSession();
  const { setAuthState } = useAuthStore();
  const { initStorage } = useVariablesStorage();

  useEffect(() => {
    setAuthState(status, session);
    initStorage(session?.user?.email);
  }, [status, session, setAuthState, initStorage]);

  return <>{children}</>;
};

export default AppLoader;
