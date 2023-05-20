import PaginaChurrasLista from "../paginas/PaginaChurrasLista";
import PaginaCriarEvento from "../paginas/PaginaCriarEvento";

export const routesConfig = [
  {
    path: "/",
    element: <PaginaChurrasLista />,
  },
  {
    path: "/criar-evento",
    element: <PaginaCriarEvento />,
  }
];
