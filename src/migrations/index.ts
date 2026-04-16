import * as migration_20260416_172011_initial from './20260416_172011_initial';

export const migrations = [
  {
    up: migration_20260416_172011_initial.up,
    down: migration_20260416_172011_initial.down,
    name: '20260416_172011_initial'
  },
];
