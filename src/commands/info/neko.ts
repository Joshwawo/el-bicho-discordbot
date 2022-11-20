import { Command } from "../../structures/Command";

export default new Command({
    name: "neko",
    description: "replies with neko",
    run: async ({ interaction }) => {
        interaction.followUp(` eres un neko ${interaction.user.username}`);
    }
});
