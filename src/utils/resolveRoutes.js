const resolveRoutes = (route) => {
  if (route.length <= 3) { //Si la cantidad de elementos de route es menor o igual que 3, entonces...
    let validRoute = route === '/' ? route : '/:id'; //Si es igual en valor y tipo a "/" una pagina me retorna, en caso contrario si es  un "/:id" un personaje me retorna este
    return validRoute;
  }
  return `/${route}`;
};

export default resolveRoutes;