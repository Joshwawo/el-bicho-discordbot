import axios from "axios";
import { Command } from "../../structures/Command";

export default new Command({
  name: "waifunsfw",
  description: "replies with a random waifu image nsfw",
  //how to set up the command to be nsfw

  options: [
    {
      name: "nsfw",
      description: "nsfw",
      type: 3,
      required: true,
      choices: [
        {
          name: "waifu",
          value: "waifu",
        },
        {
          name: "neko",
          value: "neko",
        },
        {
          name: "trap",
          value: "trap",
        },
        {
          name: "bj",
          value: "blowjob",
        },
      ],
    },
  ],
  

  run: async ({ interaction }) => {
    //how to set response to spoiler?
    // console.log(interaction.token);
    let userSelect = interaction.options.getString("nsfw");
    if (interaction.commandName === "waifunsfw") {
      const url = `https://api.waifu.pics/nsfw/${userSelect}`;
      const { data } = await axios.get(url);
      // console.log(data);

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
    }
    // interaction.followUp(` ponng ${interaction.user.username}`);
  },
});
