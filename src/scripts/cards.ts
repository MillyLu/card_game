export const cards = [
    'spades_A',
    'spades_K',
    'spades_Q',
    'spades_J',
    'spades_10',
    'spades_9',
    'spades_8',
    'spades_7',
    'spades_6',
    'hearts_A',
    'hearts_K',
    'hearts_Q',
    'hearts_J',
    'hearts_10',
    'hearts_9',
    'hearts_8',
    'hearts_7',
    'hearts_6',
    'diamonds_A',
    'diamonds_K',
    'diamonds_Q',
    'diamonds_J',
    'diamonds_10',
    'diamonds_9',
    'diamonds_8',
    'diamonds_7',
    'diamonds_6',
    'clubs_A',
    'clubs_K',
    'clubs_Q',
    'clubs_J',
    'clubs_10',
    'clubs_9',
    'clubs_8',
    'clubs_7',
    'clubs_6',
] as const;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

shuffle(cards);
console.log(cards);
