import { Config } from "../config.properties";

class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status : ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = () => {
    return this.getResource(`https://gateway.marvel.com/v1/public/characters?limit=9&offset=210&apikey=${Config.API}`);
  };
  getAllCharacter = (id) => {
    return this.getResource(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${Config.API}`);
};
}
export default MarvelService