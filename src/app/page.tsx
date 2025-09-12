"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToChat() {
  const router = useRouter();

  useEffect(() => {
    router.push('/chat');
  }, []);

  return null;
}
