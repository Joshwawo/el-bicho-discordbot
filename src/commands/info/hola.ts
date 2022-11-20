import { Command } from "../../structures/Command";

export default new Command({
    name: "hola",
    description: "replies with hola",
    run: async ({ interaction }) => {
        interaction.followUp(` hola ${interaction.user.username}`);
    }
});
