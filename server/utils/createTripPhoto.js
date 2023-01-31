const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const createTripPhoto = async (tripName) => {
  const response = await openai.createImage({
    prompt: `an nice picture of ${tripName}`,
    n: 1,
    size: "1024x1024",
  });
  image_url = response.data.data[0].url;

  return image_url;
};

module.exports = { createTripPhoto };
