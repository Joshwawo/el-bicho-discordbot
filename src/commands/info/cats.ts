import axios from "axios";
import { Command } from "../../structures/Command";

export default new Command({
    name: "cats",
    description: "replies with a random cat image",
    run: async ({ interaction }) => {
        if(interaction.commandName === "cats") {
            const url = `https://aws.random.cat/meow`;
            const {data} = await axios.get(url);

            interaction.followUp(`${interaction.user.username} here is your cat: ${data.file} `);
        }
        // interaction.followUp(` ponng ${interaction.user.username}`);
    }
});
