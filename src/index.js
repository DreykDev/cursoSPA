import router from './routes';
import './styles/styles.css'

window.addEventListener('load', router);//Se queda escuchando hasta que la carga de la pagina esta lista
window.addEventListener("hashchange", router);