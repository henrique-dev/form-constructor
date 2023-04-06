import { Outlet } from "react-router-dom";
import { MainNavigation } from "../components/MainNavigation";
import { MainLayout } from "../components/Layout/MainLayout";

export const RootLayout = () => {
  return (
    <MainLayout>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </MainLayout>
  );
};
