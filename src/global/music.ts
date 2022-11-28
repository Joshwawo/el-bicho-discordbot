import play from "play-dl";
import { createAudioResource } from "@discordjs/voice";
export const queue = new Map();

//& Crear Reproductor

export const reproducir = async (player: any, msg: any, url: any, key: any) => {
  if (msg.type == "APPLICATION_COMMAND" && msg.replied == false) {
    msg.deferReply();
  }
  const ytInfo = await play.search(url);
  const stream = await play.stream(ytInfo[0].url);
  const emb = musicEmbed(
    ytInfo[0].title,
    ytInfo[0].description,
    ytInfo[0].url,
    
  );

  if (msg.type == "APPLICATION_COMMAND") {
    msg.followUp({
      embeds: [emb],
    });
  } else {
    msg.reply({
      embeds: [emb],
    });
  }

  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
    metadata: {
      title: ytInfo[0].title,
      key: key,
    },
  });

  player.play(resource);
};

//& Agrega canciones a la lista
export const agregar = (guildId: any, song: any) => {
  const srv_queue: any = queue.get(guildId);

  if (!srv_queue) {
    const queue_const = { loop: false, songs: [] as any };
    queue.set(guildId, queue_const);
    queue_const.songs.push(song);
  } else {
    srv_queue.songs.push(song);
  }
};

//& Loop
export const loopQueue = (guildId: any) => {
  const srv_queue = queue.get(guildId);
  if (!srv_queue) return "SN";
  srv_queue.loop = !srv_queue.loop;
  return srv_queue.loop;
};

//& Regresa un arreglo de objetos que contiene la informacion de las canciones
export const fullQueue = (guildId: any) => {
  const srv_queue = queue.get(guildId);

  if (!srv_queue) return "Sin Canciones";

  const songs: any = [];

  srv_queue.songs.forEach((song: { title: any; url: any }) => {
    songs.push(`**${song.title}** - **[Link](${song.url})**\n`);
  });

  return songs;
};

//& Elimina caciones de una lista
export const eliminar = (title: any, guildId: any) => {
  const srv_queue = queue.get(guildId);
  if (!srv_queue) return "Sin Canciones";

  const songTitle = (song: { title: string | any[] }) =>
    song.title.includes(title);
  const songIndex = srv_queue.songs.findIndex(songTitle);
  const songFullTitle = srv_queue.songs.find(songTitle);

  if (!songIndex || songIndex == -1)
    return { msg: "No se encontro la cancion", title: title };
  srv_queue.songs.splice(songIndex, 1);

  return { msg: "Cancion eliminada", title: songFullTitle.title };
};

//% EMBED Musica en reproduccion
export const musicEmbed = (title: any, desc: any, link: any) => {
  return {
    author: {
      name: "El bicho",
      icon_url:
        "https://res.cloudinary.com/pantallas/image/upload/v1669415627/randoms/5ee936f3eaffe_fg7ate.jpg",
    },
    title: title,
    description: `${desc}\n**[LINK](${link})**`,
    color: "RED",
    
  };
};

//% EMBED QUEUE
export const queueEmbed = (title: any, link: any, image: any) => {
  return {
    author: {
      name: "El bicho ",
      icon_url:
        "https://res.cloudinary.com/pantallas/image/upload/v1669415627/randoms/5ee936f3eaffe_fg7ate.jpg",
    },
    title: "Queue Atualizada",
    description: `**Cancion agregadar a la lista de reproduccion.**\n\nTitulo: **${title}**\n**[LINK](${link})**`,
    color: "RED",
    thumbnail: { url: image },
  };
};

//# Cancion Sigueinte
export const nextSong = async (
  guildId: any,
  key: any,
  msg: any,
  player: any,
  connection: { destroy: () => void },
  type: string
) => {
  const queue_songs = queue.get(guildId);

  const songKey = (song: { key: any }) => song.key == key;
  const nextIndex = queue_songs.songs.findIndex(songKey) + 1;

  if (!queue_songs.songs[nextIndex]) {
    if (type === "auto" && queue_songs.loop) {
      reproducir(
        player,
        msg,
        queue_songs.songs[0].url,
        queue_songs.songs[0].key
      );
      if (msg.type == "APPLICATION_COMMAND") {
        return msg.followUp("Reiniciando las canciones");
      } else {
        return msg.channel.send("Reiniciando las canciones");
      }
    } else if (type === "auto") {
      connection.destroy();
      queue.delete(guildId);
      return msg.reply("Sin canciones por reproducir\nQueue limpia");
    }
    return msg.reply("No tenemos mas canciones");
  }

  reproducir(
    player,
    msg,
    queue_songs.songs[nextIndex].url,
    queue_songs.songs[nextIndex].key
  );
};

//# Cancion Anterior
export const previousSong = async (
  guildId: any,
  key: any,
  msg: { reply: (arg0: string) => any },
  player: any,
  connection: any
) => {
  const queue_songs = queue.get(guildId);
  const songKey = (song: { key: any }) => song.key == key;

  const previousIndex = queue_songs.songs.findIndex(songKey) - 1;

  if (!queue_songs.songs[previousIndex]) {
    return msg.reply("No existen canciones previas a esta");
  }

  reproducir(
    player,
    msg,
    queue_songs.songs[previousIndex].url,
    queue_songs.songs[previousIndex].key
  );
};

// export = {
//   queue,
//   agregar,
//   eliminar,
//   fullQueue,
//   musicEmbed,
//   queueEmbed,
//   nextSong,
//   previousSong,
//   loopQueue,
// };
