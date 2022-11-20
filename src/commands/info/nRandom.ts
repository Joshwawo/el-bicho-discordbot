import { Command } from "../../structures/Command";
import axios from 'axios';

export default new Command({
    name: "random",
    description: "replies with a random number",
   
    run: async ({ interaction }) => {
        if(interaction.commandName === "random") {
            const number = interaction.options.getNumber("number");
            const url = `https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new`;
            const {data} = await axios.get(url);

            interaction.followUp(`${interaction.user.username} you random number is ${data} `);
        }
    }
});
