import { Outlet } from "react-router-dom";

const Header = () => {
  return <header>Header</header>;
};

export const HeaderLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
