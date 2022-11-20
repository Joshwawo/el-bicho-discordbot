import axios from "axios";
import { Command } from "../../structures/Command";

export default new Command({
    name: "pilin",
    description: " replies with your  pilin length",
    run: async ({ interaction }) => {
        if(interaction.commandName === "pilin") {
            const url = `https://www.random.org/integers/?num=1&min=1&max=30&col=1&base=10&format=plain&rnd=new`;
            const {data} = await axios.get(url);

            interaction.followUp(`${interaction.user.username}: you pilin length is ${data} `);
        }
        // interaction.followUp(` ponng ${interaction.user.username}`);
    }
});
