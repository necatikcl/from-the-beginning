const en = {
  citizens: 'Citizens',
  'citizens.population': 'Population',
  'citizens.idle': 'Idle citizens',
  'citizens.farmers': 'Farmers',
  'citizens.merchants': 'Merchants',
  'citizens.builders': 'Builders',

  building: 'Building',
  'buildings.granary': 'Granary',
  'buildings.copperMine': 'Copper mine',
  'buildings.townHall': 'Town Hall',
  'buildings.townHall.level': 'Level {n}',
  'buildings.townHall.recruiting': 'New in {n}s',

  'labour.empty': 'No active labourer',
  'labour.emptyShort': 'No labourer',

  paused: 'Paused',

  'resources.happiness': 'Happiness',
  'resources.food': 'Food',
  'resources.gold': 'Gold',
  'resources.labour': 'Labour',
  'resources.capacity': 'Capacity',
  'resources.science': 'Science',

  'tabs.jobs': 'Jobs',
  'tabs.buildings': 'Buildings',
  'tabs.laws': 'Laws',
  'tabs.science': 'Science',
  'tabs.religion': 'Religion',

  'happiness.base': 'Base',
  'happiness.labels.100': 'Your citizens are feeling amazing!',
  'happiness.labels.90': 'Your citizens are very happy!',
  'happiness.labels.80': 'Your citizens are happy!',
  'happiness.labels.75': 'Your citizens are feeling normal',
  'happiness.labels.50': 'Your citizens are feeling bad',
  'happiness.labels.25': 'Your citizens are very unhappy',
  'happiness.labels.0': 'Your citizens hate you!',
  'happiness.revenueImpact': 'Revenue impact',

  upgrade: 'Upgrade',
  level: 'Level',
  'revenue/s': 'Revenue/s',

  'laws.diligence': 'Diligence Law',
  'laws.diligence.features': [
    'Increases all jobs production by 20%',
    'Citizen food consumption is doubled',
    'Idle citizens give no food',
    '-0.2 happiness per citizen',
    '-2 happiness per idle citizen',
  ],

  'laws.land': 'Nature Law',
  'laws.land.features': [
    'Farmers produce 2x food and 0.2 happiness',
    'Halves all buildings production',
  ],

  'laws.urbanization': 'Urbanization Law',
  'laws.urbanization.features': [
    'Doubles labour output',
    'Increases all building outputs by 20%',
    '-3 happiness per farmers',
    '0.2 happiness per builder',
  ],

  'laws.happiness': 'Happiness Law',
  'laws.happiness.features': [
    'Halves all jobs production.',
    'Decreases population penalty by 0.1 per citizen.',
    'Decreases citizen recruitment time by 25%.',
  ],
};

export default en;
export type Messages = typeof en;
export type MessageKey = keyof Messages;
