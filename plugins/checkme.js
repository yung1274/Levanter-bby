const { bot, getRandom } = require('../lib/')

const characteristics = [
    'Annoying', 'Charming', 'Funny', 'Serious', 'Smart', 'Courageous', 
    'Loyal', 'Adventurous', 'Creative', 'Generous', 'Kind', 'Honest', 
    'Ambitious', 'Friendly', 'Dependable', 'Optimistic', 'Pessimistic', 
    'Curious', 'Independent'
];
const hobbies = [
    'Singing', 'Dancing', 'Reading', 'Gaming', 'Cooking', 'Traveling', 
    'Painting', 'Writing', 'Swimming', 'Hiking', 'Cycling', 'Fishing', 
    'Photography', 'Gardening', 'Knitting', 'Drawing', 'Running', 
    'Skateboarding', 'Meditating'
];
const handsomeRatings = [
    'Very Ugly', 'Average', 'Handsome', 'Very Handsome', 'Not Bad', 
    'Stunning', 'Plain', 'Gorgeous', 'Unattractive', 'Attractive', 
    'Radiant', 'Decent', 'Remarkable', 'Eye-Catching', 'Cute', 
    'Dashing', 'Charming', 'Ordinary', 'Beautiful'
];
const characters = [
    'Patient', 'Impulsive', 'Calm', 'Energetic', 'Thoughtful', 
    'Reckless', 'Wise', 'Nervous', 'Confident', 'Determined', 
    'Practical', 'Emotional', 'Logical', 'Carefree', 'Serene', 
    'Ambitious', 'Gentle', 'Bold', 'Tolerant'
];

function getRandomPercentage() {
    return Math.floor(Math.random() * 101);
}

function getRandomTrait(traitArray) {
    return getRandom(traitArray);
}

bot(
    {
        pattern: 'checkme ?(.*)',
        fromMe: true,
        desc: 'user info',
        type: 'game',
    },
    async (message, match) => {
        const senderName = message.pushName || 'User';

        const aboutMessage = `*𝙲𝙷𝙴𝙺𝙸𝙽𝙶 ${senderName}*
        
*𝙽𝙰𝙼𝙴 :* ${senderName}
*𝙲𝙷𝙰𝚁𝙰𝙲𝚃𝙴𝚁𝙸𝚂𝚃𝙸𝙲 :* ${getRandomTrait(characteristics)}
*𝙷𝙾𝙱𝙱𝚈 :* ${getRandomTrait(hobbies)}
*𝚂𝙸𝙼𝙿 :* ${getRandomPercentage()}%
*𝙶𝚁𝙴𝙰𝚃 :* ${getRandomPercentage()}%
*𝙷𝙰𝙽𝙳𝚂𝙾𝙼𝙴 :* ${getRandomTrait(handsomeRatings)}
*𝙲𝙷𝙰𝚁𝙰𝙲𝚃𝙴𝚁 :* ${getRandomTrait(characters)}
*𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙰𝙻𝚂 :* ${getRandomPercentage()}%
*𝙱𝙰𝙳 𝙼𝙾𝚁𝙰𝙻𝚂 :* ${getRandomPercentage()}%
*𝙸𝙽𝚃𝙴𝙻𝙻𝙸𝙶𝙴𝙽𝙲𝙴 :* ${getRandomPercentage()}%
*𝙲𝙾𝚄𝚁𝙰𝙶𝙴 :* ${getRandomPercentage()}%
*𝙰𝙵𝚁𝙰𝙸𝙳 :* ${getRandomPercentage()}%
        
*𝙰𝙻𝙻 𝙰𝙱𝙾𝚄𝚃 𝚈𝙾𝚄 🤍*`

        await message.send(aboutMessage);
    }
)
