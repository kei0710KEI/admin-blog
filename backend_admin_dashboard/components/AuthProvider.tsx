"use client";

import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Aside from "./Aside";
import Aos from "./Aos";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <Header />
      <Aside />
      <main>
        <Aos>{children}</Aos>
      </main>
    </SessionProvider>
  );
}
