// Plugin created by Tarkiin ❤️
const { isAdmin, bot, jidToNum, sleep } = require('../lib/')

bot(
    {
        pattern: 'tkick ?(.*)',
        fromMe: true,
        desc: 'Expulsa a un usuario y lo vuelve a añadir después de 5 minutos.',
        type: 'group',
        onlyGroup: true,
    },
    async (message, match) => {
        const participants = await message.groupMetadata(message.jid)
        const isImAdmin = await isAdmin(participants, message.client.user.jid)
        if (!isImAdmin) return await message.send(`_No soy administrador._`)

        // Obtener usuario mediante respuesta o mención
        let mentionedUser;
        if (message.reply_message) {
            mentionedUser = message.reply_message.key.participant
        } else {
            if (!message.mention[0] && !match) return await message.send('Uso: .tkick @nombre o responder a un mensaje')
            mentionedUser = message.mention[0] || match.trim()
        }

        if (!mentionedUser) return await message.send('Debes mencionar a un usuario o responder a su mensaje.')

        // Verificar si el usuario mencionado es administrador
        const isTargetAdmin = await isAdmin(participants, mentionedUser)
        if (isTargetAdmin) {
            return await message.send(`❌ No puedo expulsar a @${jidToNum(mentionedUser)} porque es administrador del grupo.`, 
                { mentions: [mentionedUser] }
            )
        }

        await message.send(
            `@${jidToNum(mentionedUser)} va a ser expulsado. Será añadido de nuevo en 5 minutos.`, 
            { mentions: [mentionedUser] }
        )
        
        await message.Kick([mentionedUser])
        
        await sleep(5 * 60 * 1000)
        await message.Add([mentionedUser])
        await message.send(
            `@${jidToNum(mentionedUser)} ha sido añadido de nuevo al grupo.`, 
            { mentions: [mentionedUser] }
        )
    }
)