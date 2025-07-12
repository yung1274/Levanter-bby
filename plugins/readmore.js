// adaptado de: https://github.com/BrunoSobrino/TheMystic-Bot-MD/blob/master/plugins/herramientas-readmore.js

const { bot } = require('../lib');
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

bot(
  {
    pattern: 'readmore ?(.*)',
    desc: 'Add Readmore Hi|Readmore',
    type: 'misc',
  },
  async (message, match) => {
    if (!match) {
      return await message.send('Example : readmore Hi readmore hello');
    }
    const readmoreText = match.replaceAll('readmore', readMore);
    try {
      await message.send(readmoreText);
    } catch (error) {
      console.error('Error en readmore:', error);
      await message.send('❌ Error.');
    }
  }
);
