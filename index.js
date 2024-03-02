const fs = require('fs');
const path = require('path');

const hookScriptPath = path.join('.git', 'hooks', 'pre-commit');
const configFilePath = path.join(process.cwd(), '.hookconfig.json');

// Check if pre-commit hook already exists, if not, create it
if (!fs.existsSync(hookScriptPath)) {
  const hookScriptContent = `#!/bin/sh\nnode ${path.join(process.cwd(), 'node_modules', '<package-name>', 'run-hooks.js')}`;
  fs.writeFileSync(hookScriptPath, hookScriptContent, { mode: '755' });
}

// Generate default configuration file if it doesn't exist
if (!fs.existsSync(configFilePath)) {
  const defaultConfig = {
    checks: ['prettier', 'eslint'],
  };
  fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
}
