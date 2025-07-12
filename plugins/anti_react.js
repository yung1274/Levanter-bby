const { levanter, bot, setVar, parsedJid, jidToNum } = require('../lib')
let jids = process.env.ANTIREACT_JIDS && parsedJid(process.env.ANTIREACT_JIDS)
jids = jids && jids.length > 0 && jids
const emojis = process.env.ANTIREACT_EMOJIS && process.env.ANTIREACT_EMOJIS.split(',')
const enabled = process.env.ANTIREACT === 'true'
levanter.on('reaction.message', async (client) => {
  if (
    !enabled ||
    !client.isGroup ||
    !emojis ||
    (jids && !jids.includes(client.jid)) ||
    !emojis.includes(client.text)
  )
    return
  if (process.env.ANTIREACT_MSG) {
    const msg = process.env.ANTIREACT_MSG.replace('#emoji', client.text).replace(
      '#mention',
      `@${jidToNum(client.participant)}`
    )
    await client.send(msg, {
      contextInfo: { mentionedJid: [client.participant] },
    })
  }
  await client.Kick(client.participant)
})

bot(
  {
    pattern: 'antireact ?(.*)',
    fromMe: true,
    desc: 'manage anti reaction',
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    if (!match)
      return await message.send(
        '*Example :*\nantireact on | off\nantireact jid,jid,.. no jids - works all groups\nantireact 😵‍💫,🫥,... on this reaction, user get removed\nantireact msg  #emoji reaction not allowed, #mention removed.\nantireact null - reset jids'
      )
    match = match.toLowerCase()
    if (match === 'on' || match === 'off') {
      await setVar({ ANTIREACT: match === 'on' }, message.id)
      return await message.send(`anti react settings updated : ${match}`)
    }
    const parsedJids = parsedJid(match)
    if (parsedJids.length || match === 'null') {
      const ANTIREACT_JIDS = (match === 'null' && match) || parsedJids
      await setVar({ ANTIREACT_JIDS }, message.id)
      return await message.send(`updated anti react group jids : ${parsedJids.join(',')}`)
    }
    if (match.startsWith('msg')) {
      const ANTIREACT_MSG = match.replace('msg', '').trim()
      await setVar({ ANTIREACT_MSG }, message.id)
      return await message.send(`updated anti react message : ${ANTIREACT_MSG}`)
    }
    const ANTIREACT_EMOJIS = match.split(',')
    await setVar({ ANTIREACT_EMOJIS }, message.id)
    return await message.send(`updated anti react emojis : ${ANTIREACT_EMOJIS}`)
  }
)
