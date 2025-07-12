const { bot, setVar, getVars, forwardOrBroadCast, parsedJid } = require('../lib/')

bot(
  {
    pattern: 'setvv ?(.*)',
    desc: 'set anti view once',
    type: 'whatsapp',
  },
  async (message, match) => {
    if (!match)
      return await message.send(
        `Example : \nsetvv g - send vv on chat\nsetvv p - send on bot chat\nsetvv jid - send vv on jid chat\nsetvv null - off auto vv`
      )
    match = match.toLocaleLowerCase()
    await setVar({ VV: match }, message.id)
    await message.send(`VV updated as ${match}\nDon't worry, bot restart.`)
  }
)

bot(
  {
    pattern: 'getvv ?(.*)',
    desc: 'view anti view once',
    type: 'whatsapp',
  },
  async (message, match) => {
    const vars = await getVars(message.id)
    const vv = vars['VV']
    if (!vv) return await message.send('Not set anti view once')
    await message.send(`VV = ${vv}`)
  }
)

bot(
  {
    on: 'text',
    fromMe: false,
    type: 'auto_vv',
  },
  async (message, match, ctx) => {
    if (!ctx.VV) return

    const vvJid =
      ctx.VV === 'p'
        ? message.client.user.jid
        : ctx.VV === 'g'
        ? message.jid
        : parsedJid(ctx.VV)[0] || message.client.user.jid

    if (message.message?.message[message.type]?.viewOnce && ctx.VV !== 'null' && ctx.VV !== 'false') {
      message.reply_message = null
      await forwardOrBroadCast(vvJid, message, { viewOnce: false, quoted: message.data })
    }
  }
)
