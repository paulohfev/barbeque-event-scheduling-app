import PaginaChurrasLista from "../paginas/PaginaChurrasLista";
import PaginaCriarEvento from "../paginas/PaginaCriarEvento";
import PaginaEvento from "../paginas/PaginaEvento";

export const routesConfig = [
  {
    path: "/",
    element: <PaginaChurrasLista />,
  },
  {
    path: "/criar-evento",
    element: <PaginaCriarEvento />,
  },
  {
    path: "/evento/:id",
    element: <PaginaEvento />
  }
];
