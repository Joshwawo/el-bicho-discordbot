import { Command } from "../../structures/Command";
import {
  agregar,
  eliminar,
  fullQueue,
  loopQueue,
  musicEmbed,
  nextSong,
  previousSong,
  queueEmbed,
  reproducir,
  queue,
} from "../../global/music";
import {
  AudioPlayer,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
  getVoiceConnection,
} from "@discordjs/voice";
import { v4 as uuidv4 } from "uuid";
import play from "play-dl";

export default new Command({
  name: "playdo",
  description: "replies with music",
  options: [
    {
      name: "name",
      description: "Type the music you want to hear, or url ",
      type: 3,
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    //# Canal de voz del usuario
    const voiceChannel = interaction.member.voice.channel;
    const name: any = interaction.options.getString("name");
    const vc = interaction.member.voice.channel;
    if (!vc) {
      return interaction.reply({
        content: "Tienes que estar en un canal de voz",
        ephemeral: true,
      });
    }
    //# BUSQUEDA DE VIDEO
    const ytInfo = await play.search(name);
    const stream = await play.stream(ytInfo[0].url);

    //% Agregar cancion a lista re produccion
    const song = { key: uuidv4(), title: ytInfo[0].title, url: ytInfo[0].url };
    agregar(interaction.guild?.id, song);

    //& Comprobar que no se este reproduciendo musica
    const pvc = getVoiceConnection(String(interaction.guild?.id));
    if (pvc)
      return interaction.reply({
        embeds: [
          queueEmbed(ytInfo[0].title, ytInfo[0].url, ytInfo[0].thumbnails[0].url) as any
        ],
      });

    //& CONEXION

    const connection = joinVoiceChannel({
      channelId: vc.id,
        guildId: vc.guild.id,
        adapterCreator: vc.guild.voiceAdapterCreator,

      
    });

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      metadata: {
        title: ytInfo[0].title,
        key: song.key,
      },
    });

    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    //# Respuesta
    interaction.followUp({
      embeds: [
        musicEmbed(
          ytInfo[0].title,
          ytInfo[0].description,
          ytInfo[0].url,
          
        ) as any
      ],
    });

    //# En cuanto se acabe la musica el reproductor se sale
    // console.log(player.state.resource.metadata.key);
    //% oldS = Recaba informacion de la cancion reproducida
    player.on(AudioPlayerStatus.Idle, async (oldS, newS) => {
        oldS.status = AudioPlayerStatus.Idle;
        // const key = oldS.resource.metadata.key;
      if (
        queue.get(interaction.guild?.id).songs.length <= 1 &&
        queue.get(interaction.guild?.id).loop == false
      ) {
        connection.destroy();
        queue.delete(interaction.guild?.id);
        return;
      } else {
        return nextSong(
          interaction.guild?.id,
          oldS,
          interaction,
          player,
          connection,
          "auto"
        );
      }
    });
  },
});
