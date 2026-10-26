/**
 * Environment Configuration Switcher
 *
 * QUICK SWITCH: Just change the 'development' flag below
 * - true  = Development mode (local dev environment)
 * - false = Production mode (production environment)
 */

// ==================== CHANGE THIS TO SWITCH ENVIRONMENTS ====================
export const IS_DEVELOPMENT = true; // Set to false for production
// ============================================================================

/**
 * Development Environment Configuration
 */
const developmentConfig = {
  production: false,
  environmentName: 'local',
  tenantCode: 'TN001',
  localMode: true,

  pageUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:5001',
  baseUrl: 'http://localhost:5001/fds',
  socketUrl: 'http://localhost:5001',
  apiUrlSSO: 'http://localhost:5001/fds',
};

/**
 * Development Environment 2 Configuration
 * For testing with second backend instance
 */
export const development2Config = {
  production: false,
  environmentName: 'local-dev2',
  tenantCode: 'TN001',
  localMode: true,

  pageUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:5001/fds', // Using dev2 port
  baseUrl: 'http://localhost:5001/fds',
  socketUrl: 'http://localhost:5001',
};

/**
 * Production Environment Configuration
 */
const productionConfig = {
  production: true,
  environmentName: 'general-apps',
  tenantCode: 'TN001',
  localMode: false,

  pageUrl: 'https://vm-alert.bankjakarta.co.id',
  apiUrl: 'https://vm-alert.bankjakarta.co.id/fds',
  baseUrl: 'https://vm-alert.bankjakarta.co.id/fds',
  socketUrl: 'https://vm-alert.bankjakarta.co.id',
};
/**
 * Export the active configuration based on IS_DEVELOPMENT flag
 */
export const activeEnvironment = IS_DEVELOPMENT
  ? developmentConfig
  : productionConfig;

console.log(
  `[Environment Config] Application building for: ${activeEnvironment.environmentName} (IS_DEVELOPMENT: ${IS_DEVELOPMENT})`,
);
