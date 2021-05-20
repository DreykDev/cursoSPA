//Primero importamos los elementos de los que vamos a hacer uso en el flujo de las rutas
import Header from '../templates/Header';
import Home from '../pages/home';
import Character from '../pages/character';
import Error404 from '../pages/Error404';
import getHash from '../utils/getHash';
import resolveRoutes from '../utils/resolveRoutes';

const routes = { //Objeto estableciendo las rutas de las que vamos a hacer render
  '/': Home,
  '/:id': Character,
  '/contact': 'Contact',
};

//Manejador de las rutas
const router = async () => {//Cuando se hace una funcion asincrona con async esta devuelve un promise con el valor resuelto por async. Await pausa la funcion async y espera hasta esta ser resuelta; una vez resuelto el await reanuda el async.

//Establecemos los templates que queremos hacia un elemento del DOM
  const header = null || document.getElementById('header'); //Creamos una constante "header" y la igualamos al section "header" del html
  const content = null || document.getElementById('content');

  header.innerHTML = await Header();//Igualamos el elemento "header" del html a "Header()" el template para empujar este mismo hacia la posicion en la que esta el id "header" del html
  let hash = getHash(); //Guardamos el hash en una variable "hash"
  let route = await resolveRoutes(hash); //Manejamos la ruta
  let render = routes[route] ? routes[route] : Error404;//Render contiene el valor de las rutas, las que tenemos declaradas en routes
  content.innerHTML = await render();
};

export default router;