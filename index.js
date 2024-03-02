const fs = require('fs');
const path = require('path');

// Construct the path to the pre-commit hook within the .git/hooks directory
const projectRoot = process.env.INIT_CWD;

const hooksDir = path.join(projectRoot, '.git', 'hooks');
const preCommitHookPath = path.join(hooksDir, 'pre-commit');
const configFilePath = path.join(projectRoot, '.hookconfig.json');

// Now, safely create or modify the pre-commit hook
try {
  // Check if pre-commit hook already exists, if not, create it
  if (!fs.existsSync(preCommitHookPath)) {
    const hookScriptContent = `
    #!/bin/sh

    # Extract the flag from the commit message
    FLAG=$(git log -1 --pretty=%B | grep -o -- '--chaos')

    # Pass the flag to the run-hooks.js script
    if [ -n "$FLAG" ]; then
      node ${path.join(projectRoot, 'node_modules', 'prepushpals', 'run-hooks.js')} --chaos
    else
      node ${path.join(projectRoot, 'node_modules', 'prepushpals', 'run-hooks.js')}
    fi
    `;

    fs.writeFileSync(preCommitHookPath, hookScriptContent, { mode: '755' });
    console.log('Pre-commit hook installed successfully.');
  }

  if (!fs.existsSync(configFilePath)) {
    const defaultConfig = {
      checks: ['prettier', 'eslint'],
    };
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
  }
} catch (error) {
  console.error('Error installing pre-commit hook:', error);
}
