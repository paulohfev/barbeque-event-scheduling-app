import PaginaChurrasLista from "../paginas/PaginaChurrasLista";
import PaginaCriarEvento from "../paginas/PaginaCriarEvento";
import PaginaEvento from "../paginas/PaginaEvento";
import { Rotas } from "../enums/rotas";

export const routesConfig = [
  {
    path: Rotas.root,
    element: <PaginaChurrasLista />,
  },
  {
    path: Rotas.criarEvento,
    element: <PaginaCriarEvento />,
  },
  {
    path: Rotas.evento,
    element: <PaginaEvento />
  }
];
