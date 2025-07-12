const { bot } = require("../lib/");
const axios = require("axios");

bot(
  {
    pattern: "joke",
    desc: "Get a random joke",
    type: "fun",
  },
  async (message) => {
    try {
      const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
      const data = response.data;

      const jokeMessage = `
😂 Joke:
Setup: ${data.setup}
Punchline: ${data.punchline}
      `;

      await message.send(jokeMessage);
    } catch (error) {
      console.error("Joke Error:", error);
      await message.send("⚠️ Failed to fetch a joke");
    }
  }
);