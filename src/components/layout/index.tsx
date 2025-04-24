import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export function Layout() {
  return (
    <>
      {/* renderiza o Header em todas as páginas */}
      <Header />
      {/* renderiza o restante da página */}
      <Outlet />
    </>
  )
}