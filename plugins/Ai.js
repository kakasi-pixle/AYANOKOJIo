import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "📩مرحبا انا بوت ايانوكوجي انا بوت مثقف يمكنك ان تسألني اي سؤال¶*
       🖊️ مثال
       *√ايانوكوجي رشح لي انمي🗡️"
    await m.reply(wait)
    const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: text },
  ];
    try {
        let res = await chatWithGPT(messages)
        await m.reply(res.choices[0].message.content)
    } catch (e) {
        await m.reply('error')
    }
}
handler.help = ["بوت"]
handler.tags = ["ai"];
handler.command = /^(ايانوكوجي)$/i

export default handler

/* New Line */
async function chatWithGPT(messages) {
    try {
        const response = await fetch("https://chatbot-ji1z.onrender.com/chatbot-ji1z", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
                }
