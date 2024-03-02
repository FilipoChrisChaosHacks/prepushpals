const fs = require('fs');
const path = require('path');

// Construct the path to the pre-commit hook within the .git/hooks directory
const hooksDir = path.join(process.cwd(), '.git', 'hooks');
const preCommitHookPath = path.join(hooksDir, 'pre-commit');

// Ensure the .git/hooks directory exists
if (!fs.existsSync(hooksDir)) {
  console.log(`Creating directory: ${hooksDir}`);
  fs.mkdirSync(hooksDir, { recursive: true });
}

// Now, safely create or modify the pre-commit hook
try {
  const hookScriptContent = `#!/bin/sh\n# Your pre-commit hook logic here`;
  fs.writeFileSync(preCommitHookPath, hookScriptContent, { mode: '755' });
  console.log('Pre-commit hook installed successfully.');
} catch (error) {
  console.error('Error installing pre-commit hook:', error);
}
