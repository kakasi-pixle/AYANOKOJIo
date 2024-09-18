let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
await conn.reply(id, '*لقد قضيت معكم وقتاً رائعاً الى اللقاء U+2066^⁠_⁠^U+2069*') 
await conn.groupLeave(id)}
handler.command = /^(اخرج|اطلع|غادر|خروج)$/i
handler.group = true
handler.rowner = true
export default handler
