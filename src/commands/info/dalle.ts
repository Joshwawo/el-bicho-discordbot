import { Command } from "../../structures/Command";
import { configuration } from "../../config/openaiConfig";
import { OpenAIApi } from "openai";

const openAI = new OpenAIApi(configuration);

export default new Command({
  name: "dalle",
  description: "replies with dalle image",
  options: [
    {
      name: "prompt",
      description: "prompt",
      type: 3,
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const prompt = interaction.options.getString("prompt");
    try {
      const response = await openAI.createImage({
        prompt: String(prompt),
        n: 1,
        size: "1024x1024",
        user: "davinci",
        response_format: "url",
      });
      let imageResponse = response.data.data[0].url as string;
      interaction.followUp({
        content: `${interaction.user.username} here is your dalle image:`,
        embeds: [
          {
            image: {
              url: imageResponse,
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
      interaction.followUp(`wrong prompt`);
    }
  },
});
