import * as migration_20260416_172011_initial from './20260416_172011_initial';
import * as migration_20260416_175129_add_geography_cta_globals from './20260416_175129_add_geography_cta_globals';

export const migrations = [
  {
    up: migration_20260416_172011_initial.up,
    down: migration_20260416_172011_initial.down,
    name: '20260416_172011_initial',
  },
  {
    up: migration_20260416_175129_add_geography_cta_globals.up,
    down: migration_20260416_175129_add_geography_cta_globals.down,
    name: '20260416_175129_add_geography_cta_globals'
  },
];
