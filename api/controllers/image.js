export const image = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      entries.length
        ? res.json(entries[0].entries)
        : res.status(400).json("not found");
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

const PAT = process.env.PAT_KEY ;
console.log(PAT);
const USER_ID = "x2oimqxcgzh2";
const APP_ID = "my-first-application-nnt4x";

const getClairfaiJSONResponse = (imgURL) => {
  const IMAGE_URL = imgURL;
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
};

export const handleImageRecognition = (req, res) => {
  const { modelId, url } = req.body;
  fetch(
    "https://api.clarifai.com/v2/models/" + modelId + "/outputs",
    getClairfaiJSONResponse(url)
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with API"));
};
