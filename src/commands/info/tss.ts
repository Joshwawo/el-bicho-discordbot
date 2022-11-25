import { Command } from "../../structures/Command";
import { voicesLang } from "../../data/voiceLangs";
import axios from "axios";
import promises from "node:timers/promises";
import { MessageAttachment } from "discord.js";

const homeroTss =
  "Cuando yo la vi Dije, si esa mujer fuera para mí Perdóname, te lo tenía que decir 'Tás dura, duraDura, dura, dura Que estás dura, mano arriba porque tú te ves bien 'Tás dura, mamacita, te fuiste de nivel Dura, mira como brilla tu piel 'Tás dura, dímelo, dímelo, ¿Cómo es que e'? 'Tás dura, yo te doy un veinte de diez 'Tás dura, dura, dura Tú eres la máquina, la máquina de baile Si no tiene' a nadie vente pa' mi' brazos, caile Ese perfume se siente en el aire Algo como Argentina, tú me traes los Buenos Aires";

export default new Command({
  name: "ttsc",
  description: "replies with tss sound",
  options: [
    {
      name: "tss",
      description: "Type the tss you want to hear, ",
      type: 3,
      required: true,
    },
    {
      name: "voice",
      description: "select the voice you want to hear",
      type: 3,
      required: true,
      choices: voicesLang,
    },
  ],
  run: async ({ interaction }) => {
    const tssReq = interaction.options.getString("tss");
    const voicesReq = interaction.options.getString("voice");
    // console.log(voicesReq);
    // console.log(tss)

    try {
      const url2 = `https://api-projects-production.up.railway.app/voices/tss`;
      const url =`https://api-projects.up.railway.app/voices/tss`;
      const dataAxios = {
        tts: tssReq,
        voice: voicesReq,
        pace: 10,
      };

      const response = await axios.post(url, dataAxios);
      const result = response.data;
      console.log(result);
      const { path } = result;

      interaction.followUp({
        files: [
          {
            attachment: String(path),
            name: String(path),
          },
        ],
      });
    } catch (error) {
      console.log(error);
      interaction.followUp(
        ` voice not found, o sabra  que paso ${interaction.user.username} xd`
      );
    }
  },
});
