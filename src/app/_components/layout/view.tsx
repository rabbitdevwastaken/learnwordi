import { NavigationBar } from "./navigation-bar";

type ViewProps = {
  children: React.ReactNode;
};

export const View: React.FC<ViewProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavigationBar />

      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {children}
      </div>
    </main>
  );
};
``