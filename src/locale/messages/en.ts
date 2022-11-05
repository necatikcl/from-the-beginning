const en = {
  citizens: 'Citizens',
  'citizens.population': 'Population',
  'citizens.idle': 'Idle citizens',
  'citizens.farmers': 'Farmers',
  'citizens.merchants': 'Merchants',
  'citizens.lumberjacks': 'Lumberjacks',
  'citizens.miners': 'Miners',
  'citizens.builders': 'Builders',

  building: 'Building',
  'buildings.granary': 'Granary',
  'buildings.copperMine': 'Copper mine',
  'buildings.townHall': 'Town Hall',
  'buildings.townHall.level': 'Level {n}',
  'buildings.townHall.recruiting': 'New in {n}s',

  'resources.happiness': 'Happiness',
  'resources.food': 'Food',
  'resources.gold': 'Gold',
  'resources.wood': 'Wood',
  'resources.iron': 'Iron',
  'resources.labour': 'Labour',
  'resources.capacity': 'Capacity',

  upgrade: 'Upgrade',
  level: 'Level',
  'revenue/s': 'Revenue/s',
};

export default en;
export type Messages = typeof en;
export type MessageKey = keyof Messages;
