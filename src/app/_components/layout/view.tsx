"use client";
import { NavigationBar } from "./navigation-bar";
import { SessionProvider } from "next-auth/react";

type ViewProps = {
  children: React.ReactNode;
};

export const View: React.FC<ViewProps> = ({ children }) => {
  return (
    <SessionProvider>
      <main className="flex min-h-screen flex-col items-center">
        <NavigationBar />

        <div className="container flex-grow flex relative flex-col justify-center gap-6 px-4 py-8">
          {children}
        </div>
      </main>
    </SessionProvider>
  );
};
``;
