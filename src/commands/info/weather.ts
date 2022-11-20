import { Command } from "../../structures/Command";
import axios from "axios";

export default new Command({
  name: "weather",
  description: "replies with the weather",
  options: [
    {
      name: "city",
      description: "The city you want to know the weather",
      type: 3,
      required: true,
    },
  ],

  run: async ({ interaction }) => {
    if (interaction.commandName === "weather") {
      const city = interaction.options.getString("city");
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        interaction.followUp(
          `The weather in ${city} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C`
        );
      } catch (error) {
        interaction.followUp(
            `I couldn't find the weather for ${city}, please try again`
        );
        console.log(error);
      }
    }
  },
});
