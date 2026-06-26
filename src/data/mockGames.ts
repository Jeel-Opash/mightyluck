'use client';

export interface GameCard {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ProviderCard {
  id: string;
  name: string;
  logo: string;
  gamesCount: number;
}

export interface WinnerRecord {
  id: string;
  gameTitle: string;
  gameImage: string;
  username: string;
  time: string;
  payout: string;
  payoutAmount: number;
}

export const slotGames: GameCard[] = [
  { id: 's1', title: 'ALLY ALIENS', category: 'Slots', image: '/games/slots/slot-1.png' },
  { id: 's2', title: "ANUBIS' TRIAL", category: 'Slots', image: '/games/slots/slot-2.png' },
  { id: 's3', title: 'CACTUS GOES NUTS', category: 'Slots', image: '/games/slots/slot-3.png' },
  { id: 's4', title: "PANTHER'S RICHES", category: 'Slots', image: '/games/slots/slot-4.png' },
  { id: 's5', title: 'HONEY MONEY MULTIPLIER', category: 'Slots', image: '/games/slots/slot-5.png' },
  { id: 's6', title: 'POPPING MANIA', category: 'Slots', image: '/games/slots/slot-6.png' },
  { id: 's7', title: 'DOUBLE WIN COLLECTION', category: 'Slots', image: '/games/slots/slot-7.png' },
  { id: 's8', title: 'ALLY ALIENS II', category: 'Slots', image: '/games/slots/slot-1.png' },
  { id: 's9', title: "ANUBIS' TREASURE", category: 'Slots', image: '/games/slots/slot-2.png' },
  { id: 's10', title: 'CACTUS WILD', category: 'Slots', image: '/games/slots/slot-3.png' },
];

export const originalGames: GameCard[] = [
  { id: 'o1', title: 'MIGHTY MINES', category: 'Originals', image: '/games/original/original-1.png' },
  { id: 'o2', title: 'WINTER PLINKO', category: 'Originals', image: '/games/original/original-2.png' },
  { id: 'o3', title: 'LUCKY CRASH', category: 'Originals', image: '/games/original/original-3.png' },
  { id: 'o4', title: 'DICE DELUXE', category: 'Originals', image: '/games/original/original-4.png' },
  { id: 'o5', title: 'WHEEL OF LUCK', category: 'Originals', image: '/games/original/original-5.png' },
  { id: 'o6', title: 'KENO EXTREME', category: 'Originals', image: '/games/original/original-6.png' },
  { id: 'o7', title: 'HILO ROYALE', category: 'Originals', image: '/games/original/original-7.png' },
  { id: 'o8', title: 'LIMBO RUSH', category: 'Originals', image: '/games/original/original-8.png' },
];

export const crashGames: GameCard[] = [
  { id: 'c1', title: 'CRASH', category: 'Crash', image: '/games/crash/crash-1.png' },
  { id: 'c2', title: 'CRASH TOUCHDOWN', category: 'Crash', image: '/games/crash/crash-2.png' },
  { id: 'c3', title: 'CRUSADER', category: 'Crash', image: '/games/crash/crash-3.png' },
  { id: 'c4', title: 'CRASH BONUS', category: 'Crash', image: '/games/crash/crash-4.png' },
  { id: 'c5', title: 'CRASH GOAL', category: 'Crash', image: '/games/crash/crash-5.png' },
  { id: 'c6', title: 'CRASH FRUIT', category: 'Crash', image: '/games/crash/crash-6.png' },
  { id: 'c7', title: 'CRASH PUCK', category: 'Crash', image: '/games/crash/crash-7.png' },
  { id: 'c8', title: 'CRASH SPACE', category: 'Crash', image: '/games/crash/crash-8.png' },
];

export const providerList: ProviderCard[] = [
  { id: 'p1', name: 'Belatra', logo: '/games/providers/g1.png', gamesCount: 226 },
  { id: 'p2', name: 'BGaming', logo: '/games/providers/g2.png', gamesCount: 226 },
  { id: 'p3', name: 'TaDa Gaming', logo: '/games/providers/g3.png', gamesCount: 226 },
  { id: 'p4', name: 'Endorphina', logo: '/games/providers/g4.png', gamesCount: 226 },
  { id: 'p5', name: 'Nolimit City', logo: '/games/providers/g5.png', gamesCount: 226 },
  { id: 'p6', name: 'Hacksaw Gaming', logo: '/games/providers/g6.png', gamesCount: 226 },
  { id: 'p7', name: 'Booming Games', logo: '/games/providers/g7.png', gamesCount: 226 },
];

export const tableGames: GameCard[] = [
  { id: 't1', title: 'BACCARAT', category: 'Table', image: '/games/table/table-1.png' },
  { id: 't2', title: 'AMERICAN ROULETTE', category: 'Table', image: '/games/table/table-2.png' },
  { id: 't3', title: 'LA PARTAGE ROULETTE DE LUXE', category: 'Table', image: '/games/table/table-3.png' },
  { id: 't4', title: 'DRAGON TIGER', category: 'Table', image: '/games/table/table-4.png' },
  { id: 't5', title: 'ANDAR BAHAR', category: 'Table', image: '/games/table/table-5.png' },
  { id: 't6', title: "RIDE'EM POKER", category: 'Table', image: '/games/table/table-6.png' },
  { id: 't7', title: 'DEUCES AND JOKER MULTI-HAND', category: 'Table', image: '/games/table/table-7.png' },
  { id: 't8', title: 'BLACKJACK CLASSIC', category: 'Table', image: '/games/table/table-8.png' },
];

export const bonusGames: GameCard[] = [
  { id: 'b1', title: 'ECHNATON GOLD', category: 'Bonus', image: '/games/bonus/bonus-1.png' },
  { id: 'b2', title: 'MONKEYS GO BANANAS MULTIMAX', category: 'Bonus', image: '/games/bonus/bonus-2.png' },
  { id: 'b3', title: 'RAGNA RAVENS WILD ENERGY', category: 'Bonus', image: '/games/bonus/bonus-3.png' },
  { id: 'b4', title: 'NEON VILLAINS', category: 'Bonus', image: '/games/bonus/bonus-4.png' },
  { id: 'b5', title: 'FRUITYLICIOUS DOUBLEMAX', category: 'Bonus', image: '/games/bonus/bonus-5.png' },
  { id: 'b6', title: 'CASH STREAK DICE', category: 'Bonus', image: '/games/bonus/bonus-6.png' },
  { id: 'b7', title: 'LUCKY CLOVERLAND DICE', category: 'Bonus', image: '/games/bonus/bonus-7.png' },
  { id: 'b8', title: 'WILD JOKER STACKS', category: 'Bonus', image: '/games/bonus/bonus-8.png' },
];

export const collectionList = [
  { id: 'col1', name: 'MYTHOLOGY', image: '/games/collections/Frame 1.png' },
  { id: 'col2', name: 'FRUITS', image: '/games/collections/Frame 2.png' },
  { id: 'col3', name: 'ANIMALS', image: '/games/collections/Frame 3.png' },
  { id: 'col4', name: 'ASIA', image: '/games/collections/Frame 4.png' },
];

export const recentWinners: WinnerRecord[] = [
  { id: 'w1', gameTitle: 'Sweet Bonanza Super Scatter', gameImage: '/games/slots/slot-1.png', username: 'Alb****', time: '14:16 PM', payout: '$126.1', payoutAmount: 126.1 },
  { id: 'w2', gameTitle: 'Honey Money Multiplier', gameImage: '/games/slots/slot-5.png', username: 'Tra****', time: '14:16 PM', payout: '$15.2', payoutAmount: 15.2 },
  { id: 'w3', gameTitle: 'Dragon Tiger', gameImage: '/games/table/table-4.png', username: 'Hid******', time: '14:15 PM', payout: '$77.08', payoutAmount: 77.08 },
  { id: 'w4', gameTitle: 'Eleven Fortune', gameImage: '/games/slots/slot-7.png', username: 'Gin***', time: '14:15 PM', payout: '$0.00', payoutAmount: 0 },
  { id: 'w5', gameTitle: 'Honey Money Multiplier', gameImage: '/games/slots/slot-5.png', username: 'Tra****', time: '14:15 PM', payout: '$11.23', payoutAmount: 11.23 },
  { id: 'w6', gameTitle: 'XO Paradise', gameImage: '/games/slots/slot-6.png', username: 'Amr******', time: '14:15 PM', payout: '$67.88', payoutAmount: 67.88 },
];
