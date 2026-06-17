'use client';

import { useAppSelector } from '@/redux/store';
import GuestHome from '@/components/GuestHome';
import UserHome from '@/components/UserHome';

export default function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <UserHome /> : <GuestHome />;
}
