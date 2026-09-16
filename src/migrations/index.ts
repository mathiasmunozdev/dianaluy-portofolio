import * as migration_20260915_010635_initial_payload_schema from './20260915_010635_initial_payload_schema';
import * as migration_20260916_041528_payload_resume from './20260916_041528_payload_resume';

export const migrations = [
  {
    up: migration_20260915_010635_initial_payload_schema.up,
    down: migration_20260915_010635_initial_payload_schema.down,
    name: '20260915_010635_initial_payload_schema',
  },
  {
    up: migration_20260916_041528_payload_resume.up,
    down: migration_20260916_041528_payload_resume.down,
    name: '20260916_041528_payload_resume'
  },
];
