import fetch from "node-fetch";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `ضيف نص 
${usedPrefix + command} كيف حالك ؟`;

  try {
    conn.sendPresenceUpdate("composing", m.chat);

    const apiUrl = `https://widipe.com/gpt4?text=${encodeURIComponent(text)}`;

    const gptResponse = await fetch(apiUrl);

    if (!gptResponse.ok)
      throw new Error("حدث  خطأ أثناء معالجة طلبك. حاول مرة أخرى لاحقاً.");

    const res = await gptResponse.json();

    if (!res.result)
      throw new Error("حدث خطأ أثناء معالجة طلبك. حاول مرة أخرى لاحقاً.");

    const imageUrl = "https://telegra.ph/file/af5ccc5465eaf7c992d41.jpg";

    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.buffer();

    await conn.sendMessage(
      m.chat,
      {
        image: imageBuffer,
        caption: res.result,
      },
      { quoted: m },
    );
  } catch (error) {
    await m.reply("حدث خطأ أثناء معالجة طلبك. حاول مرة أخرى لاحقاً.");
    console.error(error);
  }
};

handler.command = /^(ساسكي)$/i;
export default handler;
