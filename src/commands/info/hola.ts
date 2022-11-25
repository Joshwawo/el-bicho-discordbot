import axios from "axios";
import { Command } from "../../structures/Command";

export default new Command({
    name: "sus",
    description: "replies with sus",
    run: async ({ interaction }) => {

        const url ="https://api-projects.up.railway.app/images/sus/random?nsfw=false"
        const reponse = await axios.get(url)
        const result = reponse.data

        interaction.followUp({
            content: result.susImg
        })
        
        // interaction.followUp(` hola sus ${interaction.user.username})`);
    }
});
