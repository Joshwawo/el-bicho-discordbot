import { Command } from "../../structures/Command";
import {voicesList} from '../../data/voicesList'

export default new Command({
    name: "voices-list",
    description: "replies with hola",
    
    run: async ({ interaction }) => {
        interaction.followUp(`Here is the list of voices: https://api-projects-production.up.railway.app/voices/voiceslist?mode=tts-basic&language=english 
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