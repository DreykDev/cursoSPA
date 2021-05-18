import getData from "../utils/getData"

const Home = async () => { //Funcion que nos retornara la vista que requerimos
  const characters = await getData()
  //const view `` es un template literal que nos permite la interpolacion de cadenas de caracteres
  const view = `
    <div class="Characters">
      ${characters.results.map(character => `
        <article class="Character-item">
          <a href="#/${character.id}/">
            <img class="Img-character" src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
          </a>
        </article>
      `).join('')}
    </div>
  `;
  return view;
};

export default Home; //Exportamos para luego hacer un import de este archivo en otro archivos y asi hacer uso del codigo de este archivo en otros archivos