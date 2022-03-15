const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { key } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const url = `https://api.rawg.io/api/games?key=${key}`;

const router = Router();
const getApiInfo = async () => {
  let promiseArray = [];
  let allGames = [];
  try {
    for (let i = 1; i <= 5; i++) {
      const apiUrl = await axios(
        `https://api.rawg.io/api/games?key=${key}&page=${i}`
      );
      promiseArray.push(await apiUrl.data.results);
    }
    for (let i = 0; i < promiseArray.length; i++) {
      allGames = allGames.concat(
        promiseArray[i].flatMap((el) => {
          return {
            id: el.id,
            name: el.name,
            // releaseDate: el.released,
            image: el.background_image,
            rating: el.rating,
            plattforms: el.platforms.map((plat) => plat.platform.name),
            genres: el.genres.map((gen) => gen.name),
          };
        })
      );
    }

    return allGames;
  } catch (error) {
    console.log(error);
  }

  // const apiUrl = await axios(url);
  // const info = await apiUrl.data.results.map((el) => {
  //   return {
  //     id: el.id,
  //     name: el.name,
  //     releaseDate: el.released,
  //     image: el.background_image,
  //     rating: el.rating,
  //     plattforms: el.platforms.map((plat) => plat.platform.name),
  //     genres: el.genres.map((gen) => gen.name),
  //   };
  // });
  // return info;
};

const getInfoFromDb = async () => {
  const db = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      // through: {
      //   attributes: [],
      // },
    },
  });
  return db;
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getInfoFromDb();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};
/*
Ruta /Videogames:
Devuelve todos los videojuegos
ruta /videogames?name="":
Devuelve todos los vidojuegos que tengan un nombre similar

*/
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  let totalVideogames = await getAllVideogames();
  if (name) {
    let gamesName = totalVideogames.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    gamesName.length
      ? res.status(200).send(gamesName)
      : res.status(404).send("The game doesn't exist!");
  } else res.status(200).send(totalVideogames);
});

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  let arrInfo = [];
  if (id) {
    const detailsUrl = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${key}`
    );
    arrInfo.push(detailsUrl.data);

    const gameInfo = arrInfo.map((det) => {
      return {
        id: det.id,
        name: det.name,
        description: det.description,
        releaseDate: det.released,
        image: det.background_image,
        rating: det.rating,
        genres: det.genres.map((gen) => gen.name),
        plattforms: det.platforms.map((plat) => plat.platform.name),
      };
    });
    gameInfo.length
      ? res.status(200).send(gameInfo)
      : res.status(404).send("There's no videogame with that ID!");
  }
});

router.get("/genres", async (req, res) => {
  const apiGenres = await axios(` https://api.rawg.io/api/genres?key=${key}`);
  let arrGenres = apiGenres.data.results.map((gen) => gen.name);
  console.log(arrGenres);
  arrGenres.forEach((el) => {
    Genre.findOrCreate({
      where: { name: el },
    });
  });
  const allGenres = await Genre.findAll();
  res.send(allGenres);
});

router.post("/videogame", async (req, res) => {
  const {
    name,
    description,
    image,
    rating,
    releaseDate,
    genres,
    plattforms,
    createdByDb,
  } = req.body;
  if (name && description && genres && plattforms) {
    let newGame = await Videogame.create({
      name,
      description,
      image:
        image ||
        "https://th.bing.com/th/id/OIP.oxS98uS1RZig2ldIjp1wcAHaEK?pid=ImgDet&rs=1",
      rating,
      releaseDate,
      genres,
      plattforms,
      createdByDb,
    });
    genres.forEach(async (g) => {
      let genreDb = await Genre.findAll({ where: { name: g } });
      newGame.addGenre(genreDb);
    });
    return res
      .status(200)
      .json({ message: "Game Created Successfully", newGame });
  } else return res.status(404).send("Complete form correctly!");
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
