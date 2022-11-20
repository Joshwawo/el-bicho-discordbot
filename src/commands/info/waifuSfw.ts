import axios from "axios";
import { Command } from "../../structures/Command";
import { sfwData } from "../../data/waifuSfw";

export default new Command({
  name: "waifusfw",
  description: "replies with a waifu image sfw",
  options: [
    {
      name: "sfw",
      description: "category",
      type: 3,
      required: true,
      choices: sfwData,
    },
  ],

  run: async ({ interaction }) => {
    let userSelect = interaction.options.getString("sfw");
    // console.log(sfwData.length);
    if (interaction.commandName === "waifusfw") {
      try {
        const url = `https://api.waifu.pics/sfw/${userSelect}`;
        const { data } = await axios.get(url);
        interaction.followUp({
          content: `${interaction.user.username} here is your waifu image:`,
          embeds: [
            {
              image: {
                url: data.url,
              },
            },
          ],
        });
      } catch (error) {
        interaction.followUp(`wrong category`);
      }
    }
    // interaction.followUp(` ponng ${interaction.user.username}`);
  },
});
