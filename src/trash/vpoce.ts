// import { Command } from "../../structures/Command";
// import ytdl from "ytdl-core";
// import yts from "yt-search";
// import {
//   AudioPlayer,
//   StreamType,
//   createAudioPlayer,
//   createAudioResource,
//   joinVoiceChannel,
//   AudioPlayerStatus,
// } from "@discordjs/voice";


// async function videoSearch(cancion:any) {
//     const videoEncontrado = await yts(cancion);
//     return videoEncontrado.videos.length > 0 ? videoEncontrado.videos[0] : null;
// }

// export default new Command({
//   name: "music",
//   description: "replies with music",
//   options: [
//     {
//       name: "music",
//       description: "Type the music you want to hear, ",
//       type: 3,
//       required: true,
//     },
//   ],
//   run: async ({ client, interaction }) => {
//     const voiceChannel = interaction.member.voice.channel;
//     const musicReq = interaction.options.getString("music");
//     if (!voiceChannel) {
//       return interaction.followUp({
//         content: "You need to be in a voice channel to play music!",
//         ephemeral: true,
//       });
//     }
//     //Busqueda de la cancion  y validacion
//     const videoPlay = await videoSearch(musicReq);
//     if (!videoPlay) {
//         return interaction.followUp({
//             content: `No video results found for ${musicReq}`,
//             ephemeral: true,
//         });
//     }

//     //Conexion al canal de voz
//     // const connection = joinVoiceChannel({
//     //     channelId: voiceChannel.id,
//     //     guildId: voiceChannel.guild.id,
//     //     adapterCreator: voiceChannel.guild.voiceAdapterCreator,
//     // });
//     const stream = ytdl(videoPlay.url, { filter: "audioonly" });
//     //aqui se queda pendiente el guildid y el adaptercreator
//     const connect = joinVoiceChannel({
//         channelId: voiceChannel.id,
//         guildId: voiceChannel.guild.id,
//         adapterCreator: voiceChannel.guild.voiceAdapterCreator,
//     })
//     const resource = createAudioResource(stream,{ inputType: StreamType.Arbitrary });

//     const player = createAudioPlayer();
//     player.play(resource);
//     connect.subscribe(player);
//     // player.on("stateChange", (oldState, newState) => {
//     //     console.log(`Player transitioned from ${oldState.status} to ${newState.status}`);
        
//     // });
//     //idle 
//     // player.on("stateChange", (oldState, newState) => {
//     //     if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
//     // The queue is empty, end the connection
//     //         connect.destroy();
//     //     }
//     // });
//     //playing
//     console.log(videoPlay);
//     interaction.followUp({
//         content: `🎶 Now Playing: ${videoPlay.title}`,
//     });
//     //old idle
//     player.on(AudioPlayerStatus.Idle, ()=> connect.destroy());

//     // interaction.followUp(` eres un neko ${interaction.user.username}`);
//   },
// });

console.log('Holas')