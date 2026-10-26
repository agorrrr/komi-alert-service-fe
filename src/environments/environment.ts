/**
 * Main Environment Configuration
 *
 * To switch between development and production:
 * 1. Open src/environments/environment.config.ts
 * 2. Change IS_DEVELOPMENT flag (true = dev, false = production)
 * 3. Save and rebuild
 */

import { activeEnvironment } from './environment.config';

export const environment = activeEnvironment;
