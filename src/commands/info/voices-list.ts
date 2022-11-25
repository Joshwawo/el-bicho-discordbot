import { Command } from "../../structures/Command";
import {voicesList} from '../../data/voicesList'

export default new Command({
    name: "voices-list",
    description: "replies with hola",
    
    run: async ({ interaction }) => {
        const url =`https://api-projects.up.railway.app/voices/tss`;
        interaction.followUp(`Here is the list of voices: https://api-projects.up.railway.app/voices/voiceslist?mode=tts-basic&language=english 
        we recommend you to use https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc to see the list of voices
        `)
    },

    
});

// async run(message) {
//     const { guild } = message;
//     const { channels } = guild;
//     const voiceChannels = channels.cache.filter((channel) => channel.type === "GUILD_VOICE");
//     const voiceChannelsNames = voiceChannels.map((channel) => channel.name);
//     message.reply(voiceChannelsNames.join(", "));
// },

// dont fuck with me gura get your shark ass out of here